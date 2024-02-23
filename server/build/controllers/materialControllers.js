"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.materialController = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const jszip_1 = __importDefault(require("jszip"));
const database_1 = __importDefault(require("../database"));
class MaterialController {
    constructor() {
        this.storage = multer_1.default.diskStorage({
            destination(req, file, cb) {
                cb(null, "uploads");
            },
            filename(req, file, cb) {
                cb(null, file.originalname);
            },
        });
        this.upload = (0, multer_1.default)({ storage: this.storage }).array("files", 10); // 10 es el número máximo de archivos permitidos
        this.handleFileUpload = (req, res) => {
            this.upload(req, res, (err) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    console.log(err);
                    return res.status(400).json({ msg: "Error en la carga de archivos" });
                }
                if (!req.files || req.files.length === 0) {
                    console.log("No se han subido archivos.");
                    return res.status(400).json({ msg: "No se han subido archivos" });
                }
                const files = req.files;
                const paths = [];
                for (let i = 0; i < files.length; i++) {
                    console.log("Archivo subido con éxito:", files[i].path);
                    paths.push(files[i].filename);
                    // Aquí puedes guardar el nombre del archivo en la base de datos
                    yield database_1.default.query("INSERT INTO archivos (nombre) VALUES (?)", [files[i].filename]);
                }
                res.status(200).json({ paths: paths });
            }));
        };
        this.uploadsDirectory = path_1.default.join(__dirname, '../../uploads');
        this.getFiles = (req, res) => {
            // Lee el contenido del directorio de uploads
            fs_1.default.readdir(this.uploadsDirectory, (err, files) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Error al obtener la lista de archivos.');
                }
                else {
                    // Filtra los archivos para incluir solo los PDF
                    const pdfFiles = files.filter(file => file.endsWith('.pdf'));
                    res.json(pdfFiles);
                }
            });
        };
        this.deleteFile = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const filename = req.params.filename;
            const filePath = path_1.default.join(this.uploadsDirectory, filename);
            // Verificar si el archivo existe
            if (!fs_1.default.existsSync(filePath)) {
                return res.status(404).json({ message: "El archivo no existe." });
            }
            fs_1.default.unlink(filePath, (err) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    console.error(err);
                    return res
                        .status(500)
                        .json({ message: "Error al intentar borrar el archivo." });
                }
                // Aquí puedes eliminar el registro de la base de datos
                yield database_1.default.query("DELETE FROM archivos WHERE nombre = ?", [filename]);
                res.status(200).json({ message: "Archivo eliminado correctamente." });
            }));
        });
        this.downloadAllFiles = (req, res) => {
            const zip = new jszip_1.default();
            fs_1.default.readdir(this.uploadsDirectory, (err, files) => {
                if (err) {
                    console.error(err);
                    return res
                        .status(500)
                        .json({ error: "Error al leer el directorio de archivos." });
                }
                files.forEach((file) => {
                    const filePath = path_1.default.join(this.uploadsDirectory, file);
                    if (fs_1.default.existsSync(filePath)) {
                        zip.file(file, fs_1.default.readFileSync(filePath));
                    }
                });
                zip
                    .generateAsync({ type: "nodebuffer" })
                    .then((content) => {
                    res.set("Content-Type", "application/zip");
                    res.set("Content-Disposition", 'attachment; filename="todos_los_archivos.zip"');
                    res.send(content);
                })
                    .catch((error) => {
                    console.error("Error al generar el archivo ZIP:", error);
                    res.status(500).json({ error: "Error al generar el archivo ZIP." });
                });
            });
        };
    }
}
exports.materialController = new MaterialController();
exports.default = exports.materialController;
