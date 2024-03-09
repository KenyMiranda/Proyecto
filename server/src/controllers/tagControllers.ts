import { Request, Response } from 'express';
import db from '../database';
import { RowDataPacket } from 'mysql2';

class TagController {
  async createTag(req: Request, res: Response): Promise<void> {
    console.log("Recibida solicitud para crear etiqueta");
    try {
      const { name } = req.body;
      await db.query("INSERT INTO Etiquetas (nombre, tipo) VALUES (?, 'Curso')", [name]);
      res.status(201).json({ message: 'Etiqueta creada exitosamente' });
    } catch (error) {
      console.error('Error al crear la etiqueta:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async checkTagExists(req: Request, res: Response): Promise<void> {
    try {
      const { name } = req.params;
      const result = await db.query<RowDataPacket[]>("SELECT COUNT(*) as count FROM Etiquetas WHERE nombre = ?", [name]);
      const exists = result[0][0].count > 0; // Accede al primer elemento del primer array
      res.json({ exists });
    } catch (error) {
      console.error('Error al verificar la existencia de la etiqueta:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
}

export default new TagController();