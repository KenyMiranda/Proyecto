"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const alumnoGrupoControllers_1 = __importDefault(require("../controllers/alumnoGrupoControllers"));
const validateToken_1 = __importDefault(require("./validateToken"));
class AlumnoGrupoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get("/:id", validateToken_1.default, alumnoGrupoControllers_1.default.list);
        this.router.get("/", validateToken_1.default, alumnoGrupoControllers_1.default.listBaja);
        this.router.get("/s/:id", validateToken_1.default, alumnoGrupoControllers_1.default.listOne);
        this.router.put("/:id/:idG/:fecha", alumnoGrupoControllers_1.default.delete);
        this.router.put("/s/:fecha/:id_Alumno/:id_Grupo", alumnoGrupoControllers_1.default.reinscribir);
    }
}
const alumnoGrupoRoutes = new AlumnoGrupoRoutes();
exports.default = alumnoGrupoRoutes.router;
