import multer from "multer";
import path from "path";
import fs from "fs";
import { Request, Response } from "express";

class MaterialController {
  storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "uploads");
    },
    filename(req, file, cb) {
      cb(null, file.originalname);
    },
  });

  upload = multer({ storage: this.storage }).single("file");

  handleFileUpload = (req: Request, res: Response) => {
    this.upload(req, res, (err: any) => {
      if (err) {
        console.log(err);
        res.status(400).json({ msg: "Error en la carga de archivo" });
      }

      if (!req.file) {
        console.log("No se ha subido ningún archivo.");
        res.status(400).json({ msg: "No se ha subido ningun archivo" });
      }

      console.log("Archivo subido con éxito:", req.file.path);
      res.status(200).json({
        path: req.file.filename,
      });
    });
  };

  uploadsDirectory = path.join(__dirname, '../../uploads');

  getFiles =(req:Request, res:Response) => {
    // Lee el contenido del directorio de uploads
    fs.readdir(this.uploadsDirectory, (err, files) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error al obtener la lista de archivos.');
      } else {
        // Filtra los archivos para incluir solo los PDF
        const pdfFiles = files.filter(file => file.endsWith('.pdf'));
        res.json(pdfFiles);
      }
    });
  };

  deleteFile = (req: Request, res: Response) => {
    const filename = req.params.filename;
    const filePath = path.join(this.uploadsDirectory, filename);

    // Verificar si el archivo existe
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "El archivo no existe." });
    }

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ message: "Error al intentar borrar el archivo." });
      }
      res.status(200).json({ message: "Archivo eliminado correctamente." });
    });
  };
}
export const materialController = new MaterialController();
export default materialController;