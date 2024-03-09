import { Request, Response } from 'express';
import db from '../database';

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
}

export default new TagController();