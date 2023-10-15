import {Request,Response} from "express";
import db from "../database";
class MaestroController {
    public async list(req: Request, res: Response): Promise <void> {
        //const maestro = await db.query("SELECT first_nameU,last_nameU,last_nameU2,telephoneU,email FROM users WHERE id_rol=2");
        const maestro = await db.query("SELECT * from maestros");
        res.json(maestro);
      }
      public async listOne(req: Request, res: Response) {
        const {id} = req.params;
        const maestro = await db.query("SELECT * FROM maestros where id_maestro = ?",[id]);
        res.json(maestro);
      }

      public async delete(req: Request, res: Response) {
        const{id}=req.params;
        await db.query("DELETE FROM maestros WHERE id_maestro = ?",[id]);
        res.json({text: "Teacher deleted"});
      }

      public async updateMaestro(req: Request, res: Response) {
        const { id } = req.params;
        const datos = req.body;
        await db.query("UPDATE maestro SET ? WHERE id_maestro = ?", [datos, id]);
        res.json({ message: "Maestro updated" });
      }
}

export const maestroController = new MaestroController();
export default maestroController;