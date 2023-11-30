import { Request, Response } from "express";
import db from "../database";
class ClaseHorarioController {
  public async list(req: Request, res: Response): Promise<void> {
    try {
      const clase = await db.query(
        "SELECT * FROM horarios h JOIN grupos g ON h.id_grupo = g.id_grupo GROUP BY g.id_grupo,h.dia;"
      );
      res.json(clase);
    } catch (error) {
      console.error("Error al ejecutar la consulta MySQL:", error);
      res.status(500).send("Error interno del servidor");
    }
  }

  public async listOne(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const clase = await db.query(
        "SELECT * FROM horarios h JOIN grupos g ON h.id_grupo = g.id_grupo WHERE id_horario =? GROUP BY g.id_grupo,h.dia;",
        [id]
      );
      res.json(clase);
    } catch (error) {
      console.error("Error al ejecutar la consulta MySQL:", error);
      res.status(500).send("Error interno del servidor");
    }
  }
}

export const claseHorarioController = new ClaseHorarioController();
export default claseHorarioController;
