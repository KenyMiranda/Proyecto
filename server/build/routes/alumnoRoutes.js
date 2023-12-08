"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const alumnoControllers_1 = __importDefault(require("../controllers/alumnoControllers"));
const validateToken_1 = __importDefault(require("./validateToken"));
class AlumnoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get("/", validateToken_1.default, alumnoControllers_1.default.list);
        this.router.get("/:id", validateToken_1.default, alumnoControllers_1.default.listOne);
        this.router.delete("/:id", validateToken_1.default, alumnoControllers_1.default.deleteAlumno);
        this.router.put("/:id", validateToken_1.default, alumnoControllers_1.default.updateAlumno);
    }
}
const alumnoRoutes = new AlumnoRoutes();
exports.default = alumnoRoutes.router;
