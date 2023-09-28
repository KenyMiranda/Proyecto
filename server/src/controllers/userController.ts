import { Request, Response } from "express";
import db from "../database";
import alumnoController from "./alumnoControllers";
import bycrypt from "bcrypt";
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
    const password = await bycrypt.hash(req.body.password, 10);
    req.body.password = password;
    

    await db.query("INSERT INTO users SET ?", [req.body]);
    let rol = req.body.id_rol;
    console.log(req.body);
    if (rol == 1) {
      req.body = {
        first_name_A: req.body.first_nameU,
        last_name_A: req.body.last_nameU,
        last_name2_A: req.body.last_nameU2,
        telephone_A: req.body.telephoneU,
        email_A: req.body.email,
      };

      await db.query("INSERT INTO alumnos SET ?", [req.body]);
      
    } else if (rol == 2) {
      req.body = {
        first_name_M: req.body.first_nameU,
        last_name_M: req.body.last_nameU,
        last_name2_M: req.body.last_nameU2,
        telephone_M: req.body.telephoneU,
        email_M: req.body.email,
      };
      
      await db.query("INSERT INTO maestros SET ?", [req.body]);
    } else {
      req.body = {
        first_name_AD: req.body.first_nameU,
        last_name_AD: req.body.last_nameU,
        last_name2_AD: req.body.last_nameU2,
        telephone_AD: req.body.telephoneU,
        email_AD: req.body.email,
      };

      await db.query("INSERT INTO admin SET ?", [req.body]);
    }

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
