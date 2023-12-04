"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const alumnoGrupoControllers_1 = __importDefault(require("../controllers/alumnoGrupoControllers"));
class AlumnoGrupoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get("/:id", alumnoGrupoControllers_1.default.list);
    }
}
const alumnoGrupoRoutes = new AlumnoGrupoRoutes();
exports.default = alumnoGrupoRoutes.router;
