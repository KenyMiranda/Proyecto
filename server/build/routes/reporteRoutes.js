"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reporteControllers_1 = __importDefault(require("../controllers/reporteControllers"));
const validateToken_1 = __importDefault(require("./validateToken"));
class ReporteRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get("/alumnoMaestro/", validateToken_1.default, reporteControllers_1.default.listAlumnos_Maestro);
        this.router.get("/alumnoGrupo/", validateToken_1.default, reporteControllers_1.default.listAlumnos_Grupo);
    }
}
const reporteRoutes = new ReporteRoutes();
exports.default = reporteRoutes.router;
