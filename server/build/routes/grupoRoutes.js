"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const grupoControllers_1 = __importDefault(require("../controllers/grupoControllers"));
class GrupoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post("/", grupoControllers_1.default.addGrupo);
        this.router.get("/", grupoControllers_1.default.list);
        this.router.get("/:id", grupoControllers_1.default.listOne);
        this.router.delete("/:id", grupoControllers_1.default.deleteGrupo);
        this.router.put("/:id", grupoControllers_1.default.updateGrupo);
    }
}
const grupoRoutes = new GrupoRoutes();
exports.default = grupoRoutes.router;
