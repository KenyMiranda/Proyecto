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
exports.grabacionController = void 0;
const database_1 = __importDefault(require("../database"));
class GrabacionController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const grabacion = yield database_1.default.query("SELECT * FROM grabaciones");
            res.json(grabacion);
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const grabacion = yield database_1.default.query("SELECT * FROM grabaciones where id_grabaciones =?", id);
            res.json(grabacion);
        });
    }
    deleteG(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const grabacion = yield database_1.default.query("DELETE FROM grabaciones where id_grabaciones =?", id);
        });
    }
    updateG(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            let datos = req.body;
            const grabacion = yield database_1.default.query("UPDATE FROM grabaciones SET =? where id_grabaciones =?", [datos, id]);
        });
    }
    addGrabacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const grupo = yield database_1.default.query("INSERT INTO grabaciones SET ?", [req.body]);
            }
            catch (error) {
                console.error("Error al ejecutar la consulta MySQL:", error);
                res.status(500).send("Error interno del servidor");
            }
        });
    }
}
exports.grabacionController = new GrabacionController();
exports.default = exports.grabacionController;
