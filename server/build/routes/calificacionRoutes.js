"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const calificacionControllers_1 = __importDefault(require("../controllers/calificacionControllers"));
const validateToken_1 = __importDefault(require("./validateToken"));
class CalificacionRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get("/:id", validateToken_1.default, calificacionControllers_1.default.list);
        this.router.get("/", validateToken_1.default, calificacionControllers_1.default.listAll);
        this.router.get("/:idG/:id", validateToken_1.default, calificacionControllers_1.default.listOne);
        this.router.get("/s/:id", validateToken_1.default, calificacionControllers_1.default.listOneFecha);
        this.router.delete("/:id", validateToken_1.default, calificacionControllers_1.default.deleteCalificacion);
        this.router.post("/", validateToken_1.default, calificacionControllers_1.default.addCalificacion);
        this.router.put("/:id", validateToken_1.default, calificacionControllers_1.default.updateCalificacion);
    }
}
const calificacionRoutes = new CalificacionRoutes();
exports.default = calificacionRoutes.router;
