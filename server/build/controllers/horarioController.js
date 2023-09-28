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
exports.horarioController = void 0;
const database_1 = __importDefault(require("../database"));
class HorarioController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const horario = yield database_1.default.query("SELECT * FROM horarios");
            res.json(horario);
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const horario = yield database_1.default.query("SELECT * FROM horarios WHERE id_horario=?", [id]);
            res.json(horario);
        });
    }
    createHorario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const horario = yield database_1.default.query("INSERT INTO horarios SET ?", [req.body]);
            res.json({ text: "Horario Created" });
        });
    }
    deleteHorario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query("DELETE FROM alumnos WHERE id_horario=?", [id]);
            res.json({ text: "Horario deleted" });
        });
    }
    updateHorario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const datos = req.body;
            yield database_1.default.query("UPDATE alumnos SET ? WHERE id_alumno = ?", [datos, id]);
            res.json({ message: "Horario updated" });
        });
    }
}
exports.horarioController = new HorarioController();
exports.default = exports.horarioController;
