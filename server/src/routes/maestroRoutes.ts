import {Router} from "express";
import maestroController from "../controllers/maestroControllers";

class MaestroRoutes{
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get("/", maestroController.list);
        this.router.get("/:id", maestroController.listOne);
        this.router.delete("/:id", maestroController.delete);
        this.router.put("/:id", maestroController.updateMaestro);
    }
}

const maestroRoutes = new MaestroRoutes();
export default maestroRoutes.router;