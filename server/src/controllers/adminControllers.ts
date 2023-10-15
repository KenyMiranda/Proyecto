import {Request,Response} from "express";
import db from "../database";
class AdminController {
    public async list(req: Request, res: Response): Promise <void> {
        //const admin = await db.query("SELECT first_nameU,last_nameU,last_nameU2,telephoneU,email FROM users WHERE id_rol=3");
        const admin = await db.query("SELECT * from admin");
        res.json(admin);
      }
      public async listOne(req: Request, res: Response) {
        const {id} = req.params;
        const admin = await db.query("SELECT * FROM admin WHERE id_admin=?",[id]);
        res.json(admin);
      }

      public async delete(req: Request, res: Response) {
        const{id}=req.params;
        await db.query("DELETE FROM admin WHERE id_admin = ?",[id]);
        res.json({text: "Administrador deleted"});
      }

      public async updateAdmin(req: Request, res: Response) {
        const { id } = req.params;
        const datos = req.body;
        await db.query("UPDATE admin SET ? WHERE id_admin = ?", [datos, id]);
        res.json({ message: "Admin updated" });
      }
}

export const adminController = new AdminController();
export default adminController;