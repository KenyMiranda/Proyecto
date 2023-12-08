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
exports.alumnoGrupoController = void 0;
const database_1 = __importDefault(require("../database"));
class AlumnoGrupoController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const clase = yield database_1.default.query("SELECT id_user,first_nameU,last_nameU,last_nameU2,c.id_grupo from users u JOIN clase c ON u.id_user = c.id_alumno WHERE c.id_grupo =?;", id);
                res.json(clase);
            }
            catch (error) {
                console.error("Error al ejecutar la consulta MySQL:", error);
                res.status(500).send("Error interno del servidor");
            }
        });
    }
}
exports.alumnoGrupoController = new AlumnoGrupoController();
exports.default = exports.alumnoGrupoController;
