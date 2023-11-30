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
            const clase = yield database_1.default.query("SELECT * FROM clases c JOIN grupos g ON c.id_grupo = g.id_grupo GROUP BY g.id_grupo;");
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
            let alumnoId = req.body.id_alumno;
            let maestro = req.body.id_maestro;
            let maestro2 = req.body.id_maestro2;
            let grupo = req.body.id_grupo;
            /*
            let alumnoArray = await db.query(
              "Select * from clases where id_alumno = ? AND ",
              alumnoId
            );
            let alumno = JSON.parse(JSON.stringify(alumnoArray[0]));
            console.log(alumno[0]);
        
            try {
              if (alumno[0]) {
                return res.status(400).json({
                  msg: "Alumno Inscrito en otra clase",
                });
              }
            } catch (error) {
              console.error("Error al ejecutar la consulta MySQL:", error);
              res.status(500).send("Error interno del servidor");
            }
            */
            console.log(maestro);
            console.log(maestro2);
            try {
                if (maestro2 == 0) {
                    req.body.id_maestro2 = req.body.id_maestro;
                }
                if (maestro == 0 || grupo == 0) {
                    return res.status(400).json({
                        msg: "Favor de llenar los campos",
                    });
                }
                else {
                    const clase = yield database_1.default.query("INSERT INTO clases SET ?", [req.body]);
                    res.json({ message: "Registros insertados correctamente" });
                }
            }
            catch (error) {
                console.error("Error al ejecutar la consulta MySQL:", error);
                res.status(500).send("Error interno del servidor");
            }
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
