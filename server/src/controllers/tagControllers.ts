import { Request, Response } from 'express';
import db from '../database';

class TagController {
  async createTag(req: Request, res: Response): Promise<void> {
    console.log("Recibida solicitud para crear etiqueta");
    console.log(req.body);
    try {
      const { name } = req.body;
      // Aquí colocarías tu lógica para guardar la etiqueta en la base de datos
      // Por ejemplo, si quieres insertar el nombre de la etiqueta en una tabla llamada 'etiquetas':
      await db.query("INSERT INTO Etiquetas (nombre) VALUES (?)", [name]);
      res.status(201).json({ message: 'Etiqueta creada exitosamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
}

export default new TagController();