import {Request,Response} from "express";
import db from "../database";
class AlumnoController {
    public async list(req: Request, res: Response): Promise <void> {
        //const alumno = await db.query("SELECT first_nameU,last_nameU,last_nameU2,telephoneU,email FROM users WHERE id_rol=1");
        const alumno = await db.query("SELECT * FROM alumnos");
        res.json(alumno);
      }
      public async listOne(req: Request, res: Response) {
        const {id} = req.params;
        const alumno = await db.query("SELECT * FROM alumnos WHERE id_alumno=?",[id]);
        res.json(alumno);
      }


      public async deleteAlumno(req: Request, res: Response) {
        const{id}=req.params;
        await db.query("DELETE FROM alumnos WHERE id_alumno=?",[id]);
        res.json({text: "Alumno deleted"});
      }

      public async updateAlumno(req: Request, res: Response) {
        const { id } = req.params;
        const datos = req.body;
        await db.query("UPDATE alumnos SET ? WHERE id_alumno = ?", [datos, id]);
        res.json({ message: "Alumno updated" });
      }
}

export const alumnoController = new AlumnoController();
export default alumnoController;