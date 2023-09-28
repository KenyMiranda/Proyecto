"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const horarioController_1 = __importDefault(require("../controllers/horarioController"));
class AlumnoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post("/", horarioController_1.default.createHorario);
        this.router.get("/", horarioController_1.default.list);
        this.router.get("/:id", horarioController_1.default.listOne);
        this.router.delete("/:id", horarioController_1.default.deleteHorario);
        this.router.put("/:id", horarioController_1.default.updateHorario);
    }
}
const alumnoRoutes = new AlumnoRoutes();
exports.default = alumnoRoutes.router;
