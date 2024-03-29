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
        
    }
}

const adminRoutes = new AdminRoutes();
export default adminRoutes.router;