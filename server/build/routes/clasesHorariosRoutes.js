"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const claseHorarioControllers_1 = __importDefault(require("../controllers/claseHorarioControllers"));
class ClaseHorarioRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get("/", claseHorarioControllers_1.default.list);
        this.router.get("/:id", claseHorarioControllers_1.default.listOne);
    }
}
const claseHorarioRoutes = new ClaseHorarioRoutes();
exports.default = claseHorarioRoutes.router;
