import {Router} from "express";
import horarioController from "../controllers/horarioController";

class HorarioRoutes{
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.post("/",horarioController.createHorario);
        this.router.get("/", horarioController.list);
        this.router.get("/:id", horarioController.listOne);
        this.router.delete("/:id",horarioController.deleteHorario);
        this.router.put("/:id",horarioController.updateHorario);
        
        
    }
}

const horarioRoutes = new HorarioRoutes();
export default horarioRoutes.router;