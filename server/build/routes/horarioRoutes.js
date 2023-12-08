"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const horarioController_1 = __importDefault(require("../controllers/horarioController"));
const validateToken_1 = __importDefault(require("./validateToken"));
class HorarioRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post("/", validateToken_1.default, horarioController_1.default.createHorario);
        this.router.get("/", validateToken_1.default, horarioController_1.default.list);
        this.router.get("/:id", validateToken_1.default, horarioController_1.default.listOne);
        this.router.delete("/:id", validateToken_1.default, horarioController_1.default.deleteHorario);
        this.router.put("/:id", validateToken_1.default, horarioController_1.default.updateHorario);
    }
}
const horarioRoutes = new HorarioRoutes();
exports.default = horarioRoutes.router;
