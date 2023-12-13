import {Router} from "express";
import alumnoGrupoController from "../controllers/alumnoGrupoControllers";
import validateToken from "./validateToken";

class AlumnoGrupoRoutes{
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get("/:id",validateToken, alumnoGrupoController.list);
        this.router.get("/s/:id",validateToken, alumnoGrupoController.listOne);
        this.router.delete("/:id/:idG",validateToken, alumnoGrupoController.delete);

        
        
    }
}

const alumnoGrupoRoutes = new AlumnoGrupoRoutes();
export default alumnoGrupoRoutes.router;