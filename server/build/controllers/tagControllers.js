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
                const { name } = req.body;
                yield database_1.default.query("INSERT INTO Etiquetas (nombre, tipo) VALUES (?, 'Curso')", [name]);
                res.status(201).json({ message: 'Etiqueta creada exitosamente' });
            }
            catch (error) {
                console.error('Error al crear la etiqueta:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
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
                console.error('Error al verificar la existencia de la etiqueta:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
}
exports.default = new TagController();
