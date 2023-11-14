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
exports.claseController = void 0;
const database_1 = __importDefault(require("../database"));
class ClaseController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const clase = yield database_1.default.query("SELECT * FROM clases");
            res.json(clase);
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const clase = yield database_1.default.query("SELECT * FROM clases WHERE id_clase=?", [id]);
            res.json(clase);
        });
    }
    addClase(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let alumnoArray = req.body.id_alumno;
            let maestro = req.body.id_maestro;
            let grupo = req.body.id_grupo;
            const clase = yield database_1.default.query("INSERT INTO clases SET ?", [req.body]);
            res.json({ message: 'Registros insertados correctamente' });
        });
    }
    deleteClase(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const clase = yield database_1.default.query("Delete from clases where id_clase = ?", id);
            res.json({ text: "Clase eliminada" });
        });
    }
    updateClase(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const datos = req.body;
            yield database_1.default.query("UPDATE clases SET ? WHERE id_clase = ?", [datos, id]);
            res.json({ message: "Clase updated" });
        });
    }
}
exports.claseController = new ClaseController();
exports.default = exports.claseController;
