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
exports.grupoController = void 0;
const database_1 = __importDefault(require("../database"));
class GrupoController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const clase = yield database_1.default.query("SELECT * FROM grupos");
            res.json(clase);
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const clase = yield database_1.default.query("SELECT * FROM grupos WHERE id_grupo=?", [id]);
            res.json(clase);
        });
    }
    addGrupo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const grupo = yield database_1.default.query("INSERT INTO grupos SET ?", [req.body]);
            res.json({ message: 'Grupo agregado Correctamente' });
        });
    }
    deleteGrupo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const grupo = yield database_1.default.query("Delete from grupos where id_grupo = ?", id);
            res.json({ text: "Grupo eliminado" });
        });
    }
    updateGrupo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const datos = req.body;
            yield database_1.default.query("UPDATE grupos SET ? WHERE id_grupo = ?", [datos, id]);
            res.json({ message: "Grupo updated" });
        });
    }
}
exports.grupoController = new GrupoController();
exports.default = exports.grupoController;
