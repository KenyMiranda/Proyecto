import {Request,Response} from "express";
import db from "../database";
class MaestroController {
    public async list(req: Request, res: Response): Promise <void> {
        const maestro = await db.query("SELECT * FROM users where id_rol=2");
        res.json(maestro);
      }
      public async listOne(req: Request, res: Response) {
        const {id} = req.params;
        const maestro = await db.query("SELECT * FROM users WHERE id_user=? AND id_rol=2",[id]);
        res.json(maestro);
      }
}

export const maestroController = new MaestroController();
export default maestroController;