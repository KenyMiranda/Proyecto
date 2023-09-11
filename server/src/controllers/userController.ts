import { Request, Response } from "express";
import db from "../database";
class UserController {
  public async list(req: Request, res: Response) {
    const user = await db.query("SELECT * FROM users");
    res.json(user);
  }

  public async getOne(req: Request, res: Response) {
    const {id} = req.params;
    const user = await db.query("SELECT * FROM users WHERE id_user=?",[id]);
    res.json(user);
  }

  public async createUser(req: Request, res: Response) {
    await db.query("INSERT INTO users SET ?", [req.body]);
   
    console.log(req.body);
    
    res.json({ text: "User saved" });
  }

  public async deleteUser(req: Request, res: Response) {
    const{id}=req.params;
    await db.query("DELETE * FROM users WHERE id_user = ?",[id]);
    res.json({text: "User deleted"});
  }

  public async updateUser(req: Request, res: Response) {
    const {id} = req.params;
    const datos=req.body;
    await db.query("UPDATE users SET ? WHERE id_user = ?",[datos,id]);
    res.json({message: "User updated"});

  }
}

export const userController = new UserController();
export default userController;
