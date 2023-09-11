import {Router} from "express";
import alumnoController from "../controllers/alumnoControllers";

class AlumnoRoutes{
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get("/", alumnoController.list);
        this.router.get("/:id", alumnoController.listOne);
        
    }
}

const alumnoRoutes = new AlumnoRoutes();
export default alumnoRoutes.router;