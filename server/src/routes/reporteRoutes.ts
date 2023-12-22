import {Router} from "express";
import reporteController from "../controllers/reporteControllers";
import validateToken from "./validateToken";

class ReporteRoutes{
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get("/alumnoMaestro/",validateToken, reporteController.listAlumnos_Maestro);
        this.router.get("/alumnoGrupo/",validateToken, reporteController.listAlumnos_Grupo);
    }
}

const reporteRoutes = new ReporteRoutes();
export default reporteRoutes.router;