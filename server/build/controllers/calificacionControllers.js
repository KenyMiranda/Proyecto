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
            const { id } = req.params;
            try {
                const calificacion = yield database_1.default.query("SELECT * FROM calificaciones WHERE id_grupo = ?", id);
                res.json(calificacion);
            }
            catch (error) {
                console.error("Error al ejecutar la consulta MySQL:", error);
                res.status(500).send("Error interno del servidor");
            }
        });
    }
    listAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const calificacion = yield database_1.default.query("SELECT * FROM calificaciones");
                res.json(calificacion);
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
            const idG = req.params.idG;
            try {
                const calificacion = yield database_1.default.query("SELECT * FROM calificaciones WHERE id_alumno=? AND id_grupo=?", [id, idG]);
                res.json(calificacion);
            }
            catch (error) {
                console.error("Error al ejecutar la consulta MySQL:", error);
                res.status(500).send("Error interno del servidor");
            }
        });
    }
    listOneFecha(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const calificacion = yield database_1.default.query("SELECT * FROM calificaciones WHERE id_calificacion=?", id);
                res.json(calificacion);
            }
            catch (error) {
                console.error("Error al ejecutar la consulta MySQL:", error);
                res.status(500).send("Error interno del servidor");
            }
        });
    }
    addCalificacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let calif = req.body.calificacion;
            let fecha = req.body.fecha_calif;
            let grupo = req.body.id_grupo;
            try {
                let calificacion = yield database_1.default.query("Select * from calificaciones where id_alumno = ? AND fecha_calif = ? AND id_grupo=?", [req.body.id_alumno, req.body.fecha_calif, grupo]);
                let numero = "";
                let num = 0; //numero para saber si hay calificacion repetido al mismo alumno en la misma fecha
                for (numero in calificacion[0]) {
                    num = parseInt(numero) + 1;
                }
                if (num > 0) {
                    res.status(401).json({
                        msg: "Calificacion ya agregada , favor de actualizar calificacion",
                    });
                    console.log(num);
                    console.log(req.body);
                }
                else {
                    if (calif < 0 || calif > 100 || calif === "" || fecha == "") {
                        res.status(400).json({ msg: "Error en las calificaciones o fecha" });
                        console.log(req.body);
                    }
                    else {
                        try {
                            yield database_1.default.query("INSERT INTO calificaciones SET ?", [req.body]);
                            res.json({ text: "Grade added" });
                            console.log(req.body);
                        }
                        catch (error) {
                            console.error("Error al ejecutar la consulta MySQL:", error);
                            res.status(500).send("Error al insertar calificacion");
                        }
                    }
                }
            }
            catch (error) {
                console.error("Error al ejecutar la consulta MySQL:", error);
                res.status(500).send("Error interno del servidor");
            }
            /*
            let calificacion = await db.query("Select * from calificaciones where id_alumno = ?AND fecha_calif = ?", [req.body.id_alumno,req.body.fecha_calif]);
            let numero : string="" ;
            let num : number = 0; //numero para saber si hay calificacion repetido al mismo alumno en la misma fecha
            
            for( numero in calificacion[0]) {
             
               num = parseInt(numero)+1;
               
            }
            if(num>0)
            {
              res.json({text:"Calificacion ya agregada "});
              console.log(num);
              console.log(req.body);
            } else {
            if (calif < 0 || calif > 100 || calif === "") {
              res.json({text:"error en la califacion"});
              console.log(req.body);
            } else {
              await db.query("INSERT INTO calificaciones SET ?", [
                req.body
              ]);
              res.json({ text: "Grade added" });
              console.log(req.body);
            }
          }
          */
        });
    }
    deleteCalificacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield database_1.default.query("DELETE FROM calificaciones WHERE id_calificacion=?", [
                    id,
                ]);
                res.json({ text: "Grade deleted" });
            }
            catch (error) {
                console.error("Error al ejecutar la consulta MySQL:", error);
                res.status(500).send("Error interno del servidor");
            }
        });
    }
    updateCalificacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const datos = req.body;
            try {
                yield database_1.default.query("UPDATE calificaciones SET ? WHERE id_calificacion = ?", [
                    datos,
                    id,
                ]);
                res.json({ message: "Grade updated" });
            }
            catch (error) {
                console.error("Error al ejecutar la consulta MySQL:", error);
                res.status(500).send("Error interno del servidor");
            }
        });
    }
}
exports.calificacionController = new CalificacionController();
exports.default = exports.calificacionController;
