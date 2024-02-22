"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const materialControllers_1 = require("../controllers/materialControllers");
const router = (0, express_1.Router)();
// Define la ruta POST para la carga de archivos
router.post('/', materialControllers_1.materialController.handleFileUpload);
// Define la ruta GET para obtener la lista de archivos
router.get("/", materialControllers_1.materialController.getFiles);
// Define la ruta DELETE para eliminar un archivo por su nombre de archivo
router.delete("/:filename", materialControllers_1.materialController.deleteFile);
exports.default = router;
