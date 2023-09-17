import {Request,Response} from "express";
import db from "../database";
class AlumnoController {
    public async list(req: Request, res: Response): Promise <void> {
        const alumno = await db.query("SELECT * FROM users where id_rol=1");
        res.json(alumno);
      }
      public async listOne(req: Request, res: Response) {
        const {id} = req.params;
        const alumno = await db.query("SELECT * FROM users WHERE id_user=? AND id_rol=1",[id]);
        res.json(alumno);
      }

      public async delete(req: Request, res: Response) {
        const{id}=req.params;
        await db.query("DELETE FROM users WHERE id_user=? AND id_rol=1",[id]);
        res.json({text: "Alumno deleted"})
      }
}

export const alumnoController = new AlumnoController();
export default alumnoController;