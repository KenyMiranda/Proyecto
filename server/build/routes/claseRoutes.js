"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const claseControllers_1 = __importDefault(require("../controllers/claseControllers"));
const validateToken_1 = __importDefault(require("./validateToken"));
class ClaseRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post("/", validateToken_1.default, claseControllers_1.default.addClase);
        this.router.get("/", validateToken_1.default, claseControllers_1.default.list);
        this.router.get("/:id", validateToken_1.default, claseControllers_1.default.listOne);
        this.router.delete("/:id", validateToken_1.default, claseControllers_1.default.deleteClase);
        this.router.put("/:id", validateToken_1.default, claseControllers_1.default.updateClase);
    }
}
const claseRoutes = new ClaseRoutes();
exports.default = claseRoutes.router;
