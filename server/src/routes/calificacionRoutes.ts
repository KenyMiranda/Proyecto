import {Router} from "express";
import calificacionControllers from "../controllers/calificacionControllers";

class CalificacionRoutes{
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get("/", calificacionControllers.list);
        this.router.get("/:id", calificacionControllers.listOne);
        this.router.delete("/:id",calificacionControllers.deleteCalificacion);
        this.router.post("/",calificacionControllers.addCalificacion)
        this.router.put("/:id",calificacionControllers.updateCalificacion);
        
        
    }
}

const calificacionRoutes = new CalificacionRoutes();
export default calificacionRoutes.router;