"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const grabacionControllers_1 = __importDefault(require("../controllers/grabacionControllers"));
const validateToken_1 = __importDefault(require("./validateToken"));
class GrabacionRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get("/", validateToken_1.default, grabacionControllers_1.default.list);
        this.router.get("/:id", validateToken_1.default, grabacionControllers_1.default.listOne);
        this.router.post("/", validateToken_1.default, grabacionControllers_1.default.addGrabacion);
        this.router.put("/:id", validateToken_1.default, grabacionControllers_1.default.updateG);
        this.router.delete("/:id", validateToken_1.default, grabacionControllers_1.default.deleteG);
    }
}
const grabacionesRoutes = new GrabacionRoutes();
exports.default = grabacionesRoutes.router;
