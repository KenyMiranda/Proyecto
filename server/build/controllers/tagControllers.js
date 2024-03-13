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
const database_1 = __importDefault(require("../database"));
class TagController {
    createTag(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Recibida solicitud para crear etiqueta");
            try {
                const { name, type, parent_id } = req.body;
                yield database_1.default.query("INSERT INTO Etiquetas (nombre, tipo, padre_id) VALUES (?, ?, ?)", [name, type, parent_id]);
                res.status(201).json({ message: "Etiqueta creada exitosamente" });
            }
            catch (error) {
                console.error("Error al crear la etiqueta:", error);
                res.status(500).json({ error: "Error interno del servidor" });
            }
        });
    }
    checkTagExists(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = req.params;
                const result = yield database_1.default.query("SELECT COUNT(*) as count FROM Etiquetas WHERE nombre = ?", [name]);
                const exists = result[0][0].count > 0; // Accede al primer elemento del primer array
                res.json({ exists });
            }
            catch (error) {
                console.error("Error al verificar la existencia de la etiqueta:", error);
                res.status(500).json({ error: "Error interno del servidor" });
            }
        });
    }
    getParentTags(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const parentTags = yield database_1.default.query("SELECT nombre FROM Etiquetas WHERE padre_id IS NULL");
                const tags = parentTags[0].map((tag) => tag.nombre);
                res.json(tags);
            }
            catch (error) {
                console.error("Error al obtener las etiquetas principales:", error);
                res.status(500).json({ error: "Error interno del servidor" });
            }
        });
    }
    getTagIdByName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = req.params;
                let query = "SELECT id FROM Etiquetas WHERE nombre = ?";
                // Si el tipo es un curso o un módulo, agrega la condición del tipo
                if (req.query.type === 'Curso' || req.query.type === 'Módulo') {
                    query += " AND tipo = ?";
                    const result = yield database_1.default.query(query, [name, req.query.type]);
                    if (result[0].length > 0) {
                        res.json(result[0][0].id);
                    }
                    else {
                        res.json(null); // Devuelve null si no se encuentra el curso o módulo
                    }
                }
                else {
                    res.status(400).json({ error: "Tipo de etiqueta no válido" });
                }
            }
            catch (error) {
                console.error("Error al obtener el ID del curso o módulo por nombre:", error);
                res.status(500).json({ error: "Error interno del servidor" });
            }
        });
    }
    getModules(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modules = yield database_1.default.query("SELECT id, nombre FROM Etiquetas WHERE tipo = 'Módulo'");
                res.json(modules[0]);
            }
            catch (error) {
                console.error("Error al obtener los módulos:", error);
                res.status(500).json({ error: "Error interno del servidor" });
            }
        });
    }
    getAllTags(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield database_1.default.query("SELECT nombre FROM Etiquetas");
                if (Array.isArray(result[0])) {
                    const tags = result[0].map(tag => tag.nombre);
                    res.json(tags);
                }
                else {
                    res.status(500).json({ error: "Error interno del servidor" });
                }
            }
            catch (error) {
                console.error("Error al obtener las etiquetas:", error);
                res.status(500).json({ error: "Error interno del servidor" });
            }
        });
    }
    deleteTag(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = req.params;
                yield database_1.default.query("DELETE FROM Etiquetas WHERE nombre = ?", [name]);
                res.status(200).json({ message: "Etiqueta eliminada exitosamente" });
            }
            catch (error) {
                console.error("Error al eliminar la etiqueta:", error);
                res.status(500).json({ error: "Error interno del servidor" });
            }
        });
    }
}
exports.default = new TagController();
