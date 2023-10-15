"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const calificacionControllers_1 = __importDefault(require("../controllers/calificacionControllers"));
class CalificacionRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get("/", calificacionControllers_1.default.list);
        this.router.get("/:id", calificacionControllers_1.default.listOne);
        this.router.delete("/:id", calificacionControllers_1.default.deleteCalificacion);
        this.router.post("/", calificacionControllers_1.default.addCalificacion);
        this.router.put("/:id", calificacionControllers_1.default.updateCalificacion);
    }
}
const calificacionRoutes = new CalificacionRoutes();
exports.default = calificacionRoutes.router;
