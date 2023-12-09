import { Request, Response } from "express";
import db from "../database";
import alumnoController from "./alumnoControllers";
import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";
import transporter from "../nodemailer-config";
class UserController {
  public async list(req: Request, res: Response) {
    try {
      const user = await db.query("SELECT * FROM users");
      res.json(user);
    } catch (error) {
      console.error("Error al ejecutar la consulta MySQL:", error);
      res.status(500).send("Error interno del servidor");
    }
  }

  public async getOne(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const user = await db.query("SELECT * FROM users WHERE id_user=?", [id]);
      res.json(user);
    } catch (error) {
      console.error("Error al ejecutar la consulta MySQL:", error);
      res.status(500).send("Error interno del servidor");
    }
  }

  public async createUser(req: Request, res: Response) {
    const pass = req.body.password;
    const password = await bycrypt.hash(req.body.password, 10);
    req.body.password = password;
    const id = req.body.id;
    const email = req.body.email;
    
    try {
      await db.query("INSERT INTO users SET ?", [req.body]);
      let rol = req.body.id_rol;
      console.log(req.body);
      /*
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

        await db.query("INSERT INTO admins SET ?", [req.body]);
      }
      */

      

      res.json({ text: "User saved" });
        // Después de registrar al usuario con éxito, envía un correo electrónico
  const mailOptions = {
    from: 'kenalexmv@gmail.com',
    to: email,
    subject: 'Registro Exitoso',
    text: 'Gracias por registrarte en nuestra aplicación. Tu contraseña es : '+ pass,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo electrónico de registro:', error);
      return res.status(500).send('Error al enviar el correo electrónico');
    }
    console.log('Correo electrónico enviado: ' + info.response);

    // Envío de la respuesta al cliente solo después de enviar el correo electrónico
    res.status(200).send('Registro exitoso, correo electrónico enviado');
  });
      
    } catch (error) {
      console.error("Error al ejecutar la consulta MySQL:", error);
      res.status(500).send("Error interno del servidor");
    }
  }

  public async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await db.query("DELETE FROM users WHERE id_user = ?", [id]);
      res.json({ text: "User deleted" });
    } catch (error) {
      console.error("Error al ejecutar la consulta MySQL:", error);
      res.status(500).send("Error interno del servidor");
    }
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
    //validar contraseña
    let id=req.body.id;
    try {
      const correo = req.body.email;

      const contraseña = req.body.password;
      const usuario: any = await db.query(
        "Select * from users where email =?",
        [correo]
      );
      let rol: any = await db.query("Select id_rol from users where email =?", [
        correo,
      ]);

      let nombre :any = await db.query("Select first_nameU,last_nameU from users where email =?", [
        correo,
      ]);
      let nombreU = JSON.parse(JSON.stringify(nombre[0]));
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
      console.log(contraseña);{
      console.log(data[0].password)
      }
      const passwordValid = await bycrypt.compare(contraseña, data[0].password);
      console.log(passwordValid);

      if (!passwordValid) {
        return res.status(400).json({ message: "Password Incorrecta" });
      }
      //Generamos Token

      const token = jwt.sign(
        {
          
          email: correo,
          nombre:JSON.parse(JSON.stringify(nombreU[0].first_nameU+"  "+nombreU[0].last_nameU)),
          rol: JSON.parse(JSON.stringify(role[0].id_rol)),
          id:JSON.parse(JSON.stringify(data[0].id_user)),
        },
        process.env.SECRET_KEY || "pGZLwuX!rt9",
        { expiresIn: 3600 }
      );
      console.log(token);
      res.json(token);
    } catch (error) {
      console.error("Error al ejecutar la consulta MySQL:", error);
      res.status(500).send("Error interno del servidor");
    }
  }
}

export const userController = new UserController();
export default userController;
