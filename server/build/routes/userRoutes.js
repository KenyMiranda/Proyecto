"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controllers/userController"));
class UserRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get("/", userController_1.default.list);
        this.router.get("/:id", userController_1.default.getOne);
        this.router.post("/", userController_1.default.createUser);
        this.router.delete("/:id", userController_1.default.deleteUser);
        this.router.put("/:id", userController_1.default.updateUser);
    }
}
const userRoutes = new UserRoutes();
exports.default = userRoutes.router;
