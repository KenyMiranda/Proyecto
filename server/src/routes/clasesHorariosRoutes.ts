import {Router} from "express";
import claseHorarioController from "../controllers/claseHorarioControllers";

class ClaseHorarioRoutes{
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get("/", claseHorarioController.list);
        this.router.get("/:id", claseHorarioController.listOne);

        
        
    }
}

const claseHorarioRoutes = new ClaseHorarioRoutes();
export default claseHorarioRoutes.router;