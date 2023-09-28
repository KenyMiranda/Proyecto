import { Request, Response } from "express";
import db from "../database";
class HorarioController {
  public async list(req: Request, res: Response): Promise<void> {
    const horario = await db.query("SELECT * FROM horarios");
    res.json(horario);
  }
  public async listOne(req: Request, res: Response) {
    const { id } = req.params;
    const horario = await db.query(
      "SELECT * FROM horarios WHERE id_horario=?",
      [id]
    );
    res.json(horario);
  }

  public async createHorario(req: Request, res: Response) {
    const horario = await db.query("INSERT INTO horarios SET ?",[req.body]);
    res.json({text: "Horario Created"});
  }

  public async deleteHorario(req: Request, res: Response) {
    const { id } = req.params;
    await db.query("DELETE FROM alumnos WHERE id_horario=?", [id]);
    res.json({ text: "Horario deleted" });
  }

  public async updateHorario(req: Request, res: Response) {
    const { id } = req.params;
    const datos = req.body;
    await db.query("UPDATE alumnos SET ? WHERE id_alumno = ?", [datos, id]);
    res.json({ message: "Horario updated" });
  }
}

export const horarioController = new HorarioController();
export default horarioController;
