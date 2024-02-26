import multer from "multer";
import path from "path";
import fs from "fs";
import { Request, Response } from "express";
import JSZip from "jszip";
import db from "../database";

class MaterialController {
  storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "uploads");
    },
    filename(req, file, cb) {
      cb(null, file.originalname);
    },
  });

  upload = multer({
    storage: this.storage,
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype === 'application/pdf' ||
        file.mimetype === 'audio/mpeg'
      ) {
        cb(null, true);
      } else {
        cb(new Error('Tipo de archivo no válido'));
      }
    }
  }).array('files', 10);

  handleFileUpload = (req: Request, res: Response) => {
    this.upload(req, res, async (err: any) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ msg: "Error en la carga de archivos" });
      }
  
      if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
        console.log("No se han subido archivos.");
        return res.status(400).json({ msg: "No se han subido archivos" });
      }
  
      const files = req.files as Express.Multer.File[];
      const paths: string[] = [];
  
      for (let i = 0; i < files.length; i++) {
        console.log("Archivo subido con éxito:", files[i].path);
        paths.push(files[i].filename);
        // Aquí puedes guardar el nombre del archivo en la base de datos
        await db.query("INSERT INTO archivos (nombre) VALUES (?)", [files[i].filename]);
      }
  
      res.status(200).json({ paths: paths });
    });
  };

  uploadsDirectory = path.join(__dirname, '../../uploads');

  getFiles =(req:Request, res:Response) => {
    fs.readdir(this.uploadsDirectory, (err, files) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error al obtener la lista de archivos.');
      } else {
        const pdfFiles = files.filter(file => file.endsWith('.pdf'));
        res.json(pdfFiles);
      }
    });
  };

  deleteFile = async (req: Request, res: Response) => {
    const filename = req.params.filename;
    const filePath = path.join(this.uploadsDirectory, filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "El archivo no existe." });
    }

    fs.unlink(filePath, async (err) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ message: "Error al intentar borrar el archivo." });
      }
      await db.query("DELETE FROM archivos WHERE nombre = ?", [filename]);
      res.status(200).json({ message: "Archivo eliminado correctamente." });
    });
  };

  downloadAllFiles = (req: Request, res: Response) => {
    const zip = new JSZip();

    fs.readdir(this.uploadsDirectory, (err, files) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ error: "Error al leer el directorio de archivos." });
      }

      files.forEach((file) => {
        const filePath = path.join(this.uploadsDirectory, file);
        if (fs.existsSync(filePath)) {
          zip.file(file, fs.readFileSync(filePath));
        }
      });

      zip
        .generateAsync({ type: "nodebuffer" })
        .then((content) => {
          res.set("Content-Type", "application/zip");
          res.set(
            "Content-Disposition",
            'attachment; filename="todos_los_archivos.zip"'
          );
          res.send(content);
        })
        .catch((error) => {
          console.error("Error al generar el archivo ZIP:", error);
          res.status(500).json({ error: "Error al generar el archivo ZIP." });
        });
    });
  };
}
export const materialController = new MaterialController();
export default materialController;