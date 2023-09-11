"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const maestroControllers_1 = __importDefault(require("../controllers/maestroControllers"));
class MaestroRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get("/", maestroControllers_1.default.list);
        this.router.get("/:id", maestroControllers_1.default.listOne);
    }
}
const maestroRoutes = new MaestroRoutes();
exports.default = maestroRoutes.router;
