import {Router} from "express";
import calificacionControllers from "../controllers/calificacionControllers";
import validateToken from "./validateToken";

class CalificacionRoutes{
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get("/:id", validateToken,calificacionControllers.list);
        this.router.get("/:idG/:id",validateToken, calificacionControllers.listOne);
        this.router.delete("/:id",validateToken,calificacionControllers.deleteCalificacion);
        this.router.post("/",validateToken,calificacionControllers.addCalificacion)
        this.router.put("/:id",validateToken,calificacionControllers.updateCalificacion);
        
        
    }
}

const calificacionRoutes = new CalificacionRoutes();
export default calificacionRoutes.router;