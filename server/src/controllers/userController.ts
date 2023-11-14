import { Request, Response } from "express";
import db from "../database";
import alumnoController from "./alumnoControllers";
import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";
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

    const password = await bycrypt.hash(req.body.password, 10);
    req.body.password = password;
    const datos = req.body;
    await db.query("UPDATE users SET ? WHERE id_user = ?", [datos, id]);
    res.json({ message: "User updated" });
  }

  public async loginUser(req: Request, res: Response) {
    const correo = req.body.email;
    
    const contraseña = req.body.password;
    const usuario: any = await db.query("Select * from users where email =?", [
      correo,
    ]);
    let rol : any = await db.query("Select id_rol from users where email =?",[correo])
    

    let data = JSON.parse(JSON.stringify(usuario[0]));
    let role = JSON.parse(JSON.stringify(rol[0]));
    
    console.log(data[0]);
    console.log(role[0]);
    
   

    //console.log(password[0]);

    if (!data[0]) {
      return res.status(400).json({
        msg: "No existe correo en la base de datos",
      });
    }

    //validar contraseña

    const passwordValid = await bycrypt.compare(contraseña, data[0].password);
    console.log(passwordValid);

    if (!passwordValid) {
      return res.status(400).json({ message: "Password Incorrecta" });
    }
    //Generamos Token

    const token = jwt.sign(
      {
        email: correo,
        rol:JSON.parse(JSON.stringify(role[0].id_rol))
      },
      process.env.SECRET_KEY || "pGZLwuX!rt9",
      { expiresIn: 10 }
    );
    console.log(token);

    res.json(token);
    
  }
}

export const userController = new UserController();
export default userController;
