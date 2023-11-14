"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const claseControllers_1 = __importDefault(require("../controllers/claseControllers"));
class ClaseRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post("/", claseControllers_1.default.addClase);
        this.router.get("/", claseControllers_1.default.list);
        this.router.get("/:id", claseControllers_1.default.listOne);
        this.router.delete("/:id", claseControllers_1.default.deleteClase);
        this.router.put("/:id", claseControllers_1.default.updateClase);
    }
}
const claseRoutes = new ClaseRoutes();
exports.default = claseRoutes.router;
