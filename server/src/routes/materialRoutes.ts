import { Router } from "express";
import { materialController } from "../controllers/materialControllers";

const router = Router();

// Define la ruta POST para la carga de archivos
router.post('/', materialController.handleFileUpload);
// Define la ruta GET para obtener la lista de archivos
router.get("/", materialController.getFiles);
// Define la ruta DELETE para eliminar un archivo por su nombre de archivo
router.delete("/:filename", materialController.deleteFile);

export default router;
