import {Router} from "express";
import grupoController from "../controllers/grupoControllers";

class GrupoRoutes{
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.post("/",grupoController.addGrupo);
        this.router.get("/", grupoController.list);
        this.router.get("/:id", grupoController.listOne);
        this.router.delete("/:id",grupoController.deleteGrupo);
        this.router.put("/:id",grupoController.updateGrupo);
        
        
    }
}

const grupoRoutes = new GrupoRoutes();
export default grupoRoutes.router;