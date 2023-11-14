import {Router} from "express";
import claseController from "../controllers/claseControllers";

class ClaseRoutes{
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.post("/",claseController.addClase);
        this.router.get("/", claseController.list);
        this.router.get("/:id", claseController.listOne);
        this.router.delete("/:id",claseController.deleteClase);
        this.router.put("/:id",claseController.updateClase);
        
        
    }
}

const claseRoutes = new ClaseRoutes();
export default claseRoutes.router;