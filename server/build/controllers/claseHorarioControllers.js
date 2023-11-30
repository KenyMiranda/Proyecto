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
exports.claseHorarioController = void 0;
const database_1 = __importDefault(require("../database"));
class ClaseHorarioController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const clase = yield database_1.default.query("SELECT * FROM horarios h JOIN grupos g ON h.id_grupo = g.id_grupo GROUP BY g.id_grupo,h.dia;");
                res.json(clase);
            }
            catch (error) {
                console.error("Error al ejecutar la consulta MySQL:", error);
                res.status(500).send("Error interno del servidor");
            }
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const clase = yield database_1.default.query("SELECT * FROM horarios h JOIN grupos g ON h.id_grupo = g.id_grupo WHERE id_horario =? GROUP BY g.id_grupo,h.dia;", [id]);
                res.json(clase);
            }
            catch (error) {
                console.error("Error al ejecutar la consulta MySQL:", error);
                res.status(500).send("Error interno del servidor");
            }
        });
    }
}
exports.claseHorarioController = new ClaseHorarioController();
exports.default = exports.claseHorarioController;
