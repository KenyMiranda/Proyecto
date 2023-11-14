import { Router } from "express";
import userController from "../controllers/userController";
import validateToken from "./validateToken";
class UserRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get("/", userController.list);
        this.router.get("/:id", userController.getOne);
        this.router.post("/", userController.createUser);
        this.router.delete("/:id",userController.deleteUser);
        this.router.put("/:id",userController.updateUser);
        this.router.post("/login",userController.loginUser);
    }
}

const userRoutes = new UserRoutes();
export default userRoutes.router;
