import { Request, Response } from "express";
import db from "../database";
class UserController {
  public async list(req: Request, res: Response) {
    const user = await db.query("SELECT * FROM users");
    res.json(user);
  }

  public async getOne(req: Request, res: Response) {
    const { id } = req.params;
    const user = await db.query("SELECT * FROM users WHERE id_user=?", [id]);
    res.json(user);
  }

  public async createUser(req: Request, res: Response) {
    await db.query("INSERT INTO users SET ?", [req.body]);
    /*
    delete req.body.id_rol;
    delete req.body.password;
    await db.query(
      "INSERT INTO  alumnos (first_name_A, last_name_A, last_name2_A, telephone_A, email_A) SELECT first_nameU , last_nameU,last_nameU2,telephoneU,email from users where id_rol = 1",[req.body]);
    console.log(req.body);
      */''
    res.json({ text: "User saved" });
  }

  public async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    await db.query("DELETE FROM users WHERE id_user = ?", [id]);
    res.json({ text: "User deleted" });
  }

  public async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const datos = req.body;
    await db.query("UPDATE users SET ? WHERE id_user = ?", [datos, id]);
    res.json({ message: "User updated" });
  }
}

export const userController = new UserController();
export default userController;
