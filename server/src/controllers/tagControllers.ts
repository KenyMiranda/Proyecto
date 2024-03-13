import { Request, Response } from "express";
import db from "../database";
import { RowDataPacket } from "mysql2";

class TagController {
  async createTag(req: Request, res: Response): Promise<void> {
    console.log("Recibida solicitud para crear etiqueta");
    try {
      const { name, type, parent_id } = req.body;
      await db.query(
        "INSERT INTO Etiquetas (nombre, tipo, padre_id) VALUES (?, ?, ?)",
        [name, type, parent_id]
      );
      res.status(201).json({ message: "Etiqueta creada exitosamente" });
    } catch (error) {
      console.error("Error al crear la etiqueta:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  async checkTagExists(req: Request, res: Response): Promise<void> {
    try {
      const { name } = req.params;
      const result = await db.query<RowDataPacket[]>(
        "SELECT COUNT(*) as count FROM Etiquetas WHERE nombre = ?",
        [name]
      );
      const exists = result[0][0].count > 0; // Accede al primer elemento del primer array
      res.json({ exists });
    } catch (error) {
      console.error("Error al verificar la existencia de la etiqueta:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  async getParentTags(req: Request, res: Response): Promise<void> {
    try {
      const parentTags = await db.query<RowDataPacket[]>(
        "SELECT nombre FROM Etiquetas WHERE padre_id IS NULL"
      );
      const tags = parentTags[0].map((tag: RowDataPacket) => tag.nombre);
      res.json(tags);
    } catch (error) {
      console.error("Error al obtener las etiquetas principales:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  async getTagIdByName(req: Request, res: Response): Promise<void> {
    try {
      const { name } = req.params;
      let query = "SELECT id FROM Etiquetas WHERE nombre = ?";
      // Si el tipo es un curso o un módulo, agrega la condición del tipo
      if (req.query.type === 'Curso' || req.query.type === 'Módulo') {
        query += " AND tipo = ?";
        const result = await db.query<RowDataPacket[]>(query, [name, req.query.type]);
        if (result[0].length > 0) {
          res.json(result[0][0].id);
        } else {
          res.json(null); // Devuelve null si no se encuentra el curso o módulo
        }
      } else {
        res.status(400).json({ error: "Tipo de etiqueta no válido" });
      }
    } catch (error) {
      console.error("Error al obtener el ID del curso o módulo por nombre:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }  

  async getModules(req, res) {
    try {
      const modules = await db.query(
        "SELECT id, nombre FROM Etiquetas WHERE tipo = 'Módulo'"
      );
      res.json(modules[0]);
    } catch (error) {
      console.error("Error al obtener los módulos:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  async getAllTags(req, res) {
    try {
      const result = await db.query(
        "SELECT nombre FROM Etiquetas"
      );
  
      if (Array.isArray(result[0])) {
        const tags = result[0].map(tag => tag.nombre);
        res.json(tags);
      } else {
        res.status(500).json({ error: "Error interno del servidor" });
      }
    } catch (error) {
      console.error("Error al obtener las etiquetas:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }  

  async deleteTag(req: Request, res: Response): Promise<void> {
    try {
      const { name } = req.params;
      await db.query("DELETE FROM Etiquetas WHERE nombre = ?", [name]);
      res.status(200).json({ message: "Etiqueta eliminada exitosamente" });
    } catch (error) {
      console.error("Error al eliminar la etiqueta:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }  
}

export default new TagController();
