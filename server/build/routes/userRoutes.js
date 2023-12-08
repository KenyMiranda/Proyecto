"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controllers/userController"));
const validateToken_1 = __importDefault(require("./validateToken"));
class UserRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get("/", validateToken_1.default, userController_1.default.list);
        this.router.get("/:id", validateToken_1.default, userController_1.default.getOne);
        this.router.post("/", validateToken_1.default, userController_1.default.createUser);
        this.router.delete("/:id", validateToken_1.default, userController_1.default.deleteUser);
        this.router.put("/:id", validateToken_1.default, userController_1.default.updateUser);
        this.router.post("/login", userController_1.default.loginUser);
    }
}
const userRoutes = new UserRoutes();
exports.default = userRoutes.router;
