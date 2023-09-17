import {Request,Response} from "express";
import db from "../database";
class AdminController {
    public async list(req: Request, res: Response): Promise <void> {
        const admin = await db.query("SELECT * FROM users where id_rol=3");
        res.json(admin);
      }
      public async listOne(req: Request, res: Response) {
        const {id} = req.params;
        const admin = await db.query("SELECT * FROM users WHERE id_rol=3 AND id_user=?",[id]);
        res.json(admin);
      }

      public async delete(req: Request, res: Response) {
        const{id}=req.params;
        await db.query("DELETE FROM users WHERE id_rol=3 AND id_user = ?",[id]);
        res.json({text: "Administrador deleted"});
      }
}

export const adminController = new AdminController();
export default adminController;