import {Router} from "express";
import adminController from "../controllers/adminControllers";

class AdminRoutes{
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get("/", adminController.list);
        this.router.get("/:id", adminController.listOne);
        this.router.delete("/:id", adminController.delete);
        this.router.put("/:id", adminController.updateAdmin);
        
    }
}

const adminRoutes = new AdminRoutes();
export default adminRoutes.router;