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
            try {
                const grabacion = yield database_1.default.query("SELECT * FROM grabaciones");
                res.json(grabacion);
            }
            catch (error) {
                console.error("Error al ejecutar la consulta MySQL:", error);
                res.status(500).send("Error interno del servidor");
            }
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const grabacion = yield database_1.default.query("SELECT * FROM grabaciones where id_clase =?", id);
                res.json(grabacion);
            }
            catch (error) {
                console.error("Error al ejecutar la consulta MySQL:", error);
                res.status(500).send("Error interno del servidor");
            }
        });
    }
    listRecording(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const fecha = req.params.fecha;
            try {
                const grabacion = yield database_1.default.query("SELECT *FROM grabaciones g JOIN clase c ON g.id_clase = c.id_clase WHERE c.id_grupo =? AND g.fecha =?;", [id, fecha]);
                res.json(grabacion);
            }
            catch (error) {
                console.error("Error al ejecutar la consulta MySQL:", error);
                res.status(500).send("Error interno del servidor");
            }
        });
    }
    deleteG(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const grabacion = yield database_1.default.query("DELETE FROM grabaciones where id_grabaciones =?", id);
                res.json("Grabacion eliminada");
            }
            catch (error) {
                console.error("Error al ejecutar la consulta MySQL:", error);
                res.status(500).send("Error interno del servidor");
            }
        });
    }
    updateG(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            let datos = req.body;
            try {
                const grabacion = yield database_1.default.query("UPDATE FROM grabaciones SET =? where id_grabaciones =?", [datos, id]);
                res.json("Grabacion actualizada");
            }
            catch (error) {
                console.error("Error al ejecutar la consulta MySQL:", error);
                res.status(500).send("Error interno del servidor");
            }
        });
    }
    addGrabacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let fecha = req.body.fecha;
            let grupo = req.body.id_clase;
            console.log(grupo);
            try {
                const fechaG = yield database_1.default.query("SELECT DISTINCT g.fecha_inicio, g.fecha_final from clase c JOIN grupo g ON c.id_grupo = g.id_grupo WHERE c.id_clase =?;", grupo);
                let fechaG2 = JSON.parse(JSON.stringify(fechaG[0]));
                const fecha_inicio = fechaG2[0].fecha_inicio;
                const fecha_final = fechaG2[0].fecha_final;
                if (fecha < fecha_inicio.substring(10, 0) || fecha > fecha_final.substring(10, 0)) {
                    res.status(400).json({
                        msg: "Fecha fuera del rango de clases",
                    });
                }
                else {
                    const grabacion = yield database_1.default.query("INSERT INTO grabaciones SET ?", [
                        req.body,
                    ]);
                    res.json({ text: "Grabacion" });
                }
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
