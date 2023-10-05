"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminController = void 0;
const database_1 = __importDefault(require("../database"));
class AdminController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield database_1.default.query("SELECT first_nameU,last_nameU,last_nameU2,telephoneU,email FROM users WHERE id_rol=3");
            res.json(admin);
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const admin = yield database_1.default.query("SELECT * FROM admin WHERE id_admin=?", [id]);
            res.json(admin);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query("DELETE FROM admin WHERE id_admin = ?", [id]);
            res.json({ text: "Administrador deleted" });
        });
    }
    updateAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const datos = req.body;
            yield database_1.default.query("UPDATE admin SET ? WHERE id_admin = ?", [datos, id]);
            res.json({ message: "Admin updated" });
        });
    }
}
exports.adminController = new AdminController();
exports.default = exports.adminController;
