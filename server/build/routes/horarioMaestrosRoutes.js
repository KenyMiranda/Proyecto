"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const horarioMaestroControllers_1 = __importDefault(require("../controllers/horarioMaestroControllers"));
const validateToken_1 = __importDefault(require("./validateToken"));
class HorarioRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get("/:id", validateToken_1.default, horarioMaestroControllers_1.default.listOne);
    }
}
const horarioRoutes = new HorarioRoutes();
exports.default = horarioRoutes.router;
