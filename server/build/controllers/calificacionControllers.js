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
exports.calificacionController = void 0;
const database_1 = __importDefault(require("../database"));
class CalificacionController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const calificacion = yield database_1.default.query("SELECT * FROM calificaciones");
            res.json(calificacion);
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const calificacion = yield database_1.default.query("SELECT * FROM calificaciones WHERE id_alumno=?", [id]);
            res.json(calificacion);
        });
    }
    addCalificacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let calif = req.body.calificacion;
            let idAlumno = req.body.id_alumno;
            let fecha_calif = req.body.fecha_calif;
            let calificacion = yield database_1.default.query("Select * from calificaciones where id_alumno = ?AND fecha_calif = ?", [req.body.id_alumno, req.body.fecha_calif]);
            let numero = "";
            let num = 0; //numero para saber si hay calificacion repetido al mismo alumno en la misma fecha
            for (numero in calificacion[0]) {
                num = parseInt(numero) + 1;
            }
            if (num > 0) {
                res.json({ text: "Calificacion ya agregada " });
                console.log(num);
                console.log(req.body);
            }
            else {
                if (calif < 0 || calif > 100 || calif === "") {
                    res.json({ text: "error en la califacion" });
                    console.log(req.body);
                }
                else {
                    yield database_1.default.query("INSERT INTO calificaciones SET ?", [
                        req.body
                    ]);
                    res.json({ text: "Grade added" });
                    console.log(req.body);
                }
            }
        });
    }
    deleteCalificacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query("DELETE FROM calificaciones WHERE id_califacion=?", [id]);
            res.json({ text: "Grade deleted" });
        });
    }
    updateCalificacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const datos = req.body;
            yield database_1.default.query("UPDATE calificaciones SET ? WHERE id_calificacion = ?", [
                datos,
                id,
            ]);
            res.json({ message: "Grade updated" });
        });
    }
}
exports.calificacionController = new CalificacionController();
exports.default = exports.calificacionController;
