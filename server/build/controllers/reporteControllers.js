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
exports.reporteController = void 0;
const database_1 = __importDefault(require("../database"));
class ReporteController {
    listAlumnos_Maestro(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const list = yield database_1.default.query(`SELECT 
        u.first_nameU,
        SUM(total_alumnos) AS total_alumnos
    FROM (
        SELECT 
            g.id_maestro AS id_maestro,
            COUNT(cl.id_alumno) AS total_alumnos
        FROM 
            grupo g
        LEFT JOIN 
            clase cl ON g.id_grupo = cl.id_grupo
        GROUP BY 
            g.id_maestro
    
        UNION ALL  -- Esto unirá el conteo de alumnos para el id_maestro2
    
        SELECT 
            g.id_maestro2 AS id_maestro,
            COUNT(cl.id_alumno) AS total_alumnos
        FROM 
            grupo g
        LEFT JOIN 
            clase cl ON g.id_grupo = cl.id_grupo
        GROUP BY 
            g.id_maestro2
    ) AS subquery
    JOIN users u ON id_maestro = u.id_user
    GROUP BY 
        id_maestro;`);
                res.json(list);
            }
            catch (error) {
                console.error("Error al ejecutar la consulta MySQL:", error);
                res.status(500).send("Error interno del servidor");
            }
        });
    }
    listAlumnos_Grupo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const list = yield database_1.default.query(`SELECT g.nombre_grupo,g.Idioma,COUNT(id_alumno) AS total_alumnos from clase c 
        JOIN grupo g ON c.id_grupo = g.id_grupo GROUP BY c.id_grupo;
        `);
                res.json(list);
            }
            catch (error) {
                console.error("Error al ejecutar la consulta MySQL:", error);
                res.status(500).send("Error interno del servidor");
            }
        });
    }
}
exports.reporteController = new ReporteController();
exports.default = exports.reporteController;
