import {Router} from "express";
import alumnoGrupoController from "../controllers/alumnoGrupoControllers";

class AlumnoGrupoRoutes{
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get("/:id", alumnoGrupoController.list);

        
        
    }
}

const alumnoGrupoRoutes = new AlumnoGrupoRoutes();
export default alumnoGrupoRoutes.router;