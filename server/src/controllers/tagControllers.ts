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
      const result = await db.query<RowDataPacket[]>(
        "SELECT id FROM Etiquetas WHERE nombre = ? AND tipo = 'Curso'",
        [name]
      );
      if (result[0].length > 0) {
        res.json(result[0][0].id);
      } else {
        res.json(null); // Devuelve null si no se encuentra el curso
      }
    } catch (error) {
      console.error("Error al obtener el ID del curso por nombre:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  async getModules(req, res) {
    try {
      const modules = await db.query(
        "SELECT nombre FROM Etiquetas WHERE tipo = 'Módulo'"
      );
      res.json(modules[0]);
    } catch (error) {
      console.error("Error al obtener los módulos:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }  
}

export default new TagController();
