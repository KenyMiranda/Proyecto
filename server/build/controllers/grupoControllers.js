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
            const clase = yield database_1.default.query("SELECT * FROM grupo");
            res.json(clase);
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const clase = yield database_1.default.query("SELECT * FROM grupo WHERE id_grupo=?", [id]);
            res.json(clase);
        });
    }
    addGrupo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let maestro = req.body.id_maestro;
            let maestro2 = req.body.id_maestro2;
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
                if (maestro == 0) {
                    return res.status(400).json({
                        msg: "Favor de llenar los campos",
                    });
                }
                else {
                    const grupo = yield database_1.default.query("INSERT INTO grupo SET ?", [req.body]);
                    res.json({ message: "Grupo agregado Correctamente" });
                }
            }
            catch (error) {
                console.error("Error al ejecutar la consulta MySQL:", error);
                res.status(500).send("Error interno del servidor");
            }
        });
    }
    deleteGrupo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                let grupo = yield database_1.default.query("Select*from clase where id_grupo = ?", id);
                let calificacion = yield database_1.default.query("Select*from calificaciones where id_grupo = ?", id);
                let grabacion = yield database_1.default.query("SELECT * FROM grabaciones g JOIN clase c ON g.id_clase = c.id_clase WHERE c.id_grupo =?;", id);
                let horario = yield database_1.default.query("SELECT * FROM horarios where id_grupo=?", id);
                grupo = JSON.parse(JSON.stringify(grupo[0]));
                calificacion = JSON.parse(JSON.stringify(calificacion[0]));
                grabacion = JSON.parse(JSON.stringify(grabacion[0]));
                horario = JSON.parse(JSON.stringify(horario[0]));
                if (grabacion[0]) {
                    try {
                        yield database_1.default.query("DELETE g FROM grabaciones g JOIN clase c ON g.id_clase = c.id_clase WHERE c.id_grupo = ?;", id);
                        console.log("grabacion");
                    }
                    catch (error) { }
                }
                else if (horario[0]) {
                    try {
                        console.log("horario");
                        yield database_1.default.query("DELETE FROM horarios WHERE id_grupo = ?;", id);
                    }
                    catch (error) {
                        console.error("Error al ejecutar la consulta MySQL:", error);
                        res.status(500).send("Error interno del servidor");
                    }
                }
                else if (calificacion[0]) {
                    try {
                        console.log("calif");
                        yield database_1.default.query("DELETE FROM calificaciones WHERE id_grupo = ?;", id);
                    }
                    catch (error) {
                        console.error("Error al ejecutar la consulta MySQL:", error);
                        res.status(500).send("Error interno del servidor");
                    }
                }
                else if (grupo[0]) {
                    try {
                        console.log("grupo");
                        yield database_1.default.query("DELETE FROM clase WHERE id_grupo = ?;", id);
                    }
                    catch (error) {
                        console.error("Error al ejecutar la consulta MySQL:", error);
                        res.status(500).send("Error interno del servidor");
                    }
                }
            }
            catch (error) {
                console.error("Error al ejecutar la consulta MySQL:", error);
                res.status(500).send("Error interno del servidor");
            }
            try {
                const grupo = yield database_1.default.query("Delete from grupo where id_grupo = ?", id);
                res.json("grupo borrado");
            }
            catch (error) {
                res.status(400).json({
                    msg: 'No se puede eliminar el grupo por que esta en uso'
                });
            }
        });
    }
    updateGrupo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const datos = req.body;
            yield database_1.default.query("UPDATE grupo SET ? WHERE id_grupo = ?", [datos, id]);
            res.json({ message: "Grupo updated" });
        });
    }
}
exports.grupoController = new GrupoController();
exports.default = exports.grupoController;
