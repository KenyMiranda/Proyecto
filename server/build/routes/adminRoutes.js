"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminControllers_1 = __importDefault(require("../controllers/adminControllers"));
class AdminRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get("/", adminControllers_1.default.list);
        this.router.get("/:id", adminControllers_1.default.listOne);
        this.router.delete("/:id", adminControllers_1.default.delete);
        this.router.put("/:id", adminControllers_1.default.updateAdmin);
    }
}
const adminRoutes = new AdminRoutes();
exports.default = adminRoutes.router;
