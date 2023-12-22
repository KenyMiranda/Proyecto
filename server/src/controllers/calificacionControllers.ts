import { Request, Response } from "express";
import db from "../database";

class CalificacionController {
  public async list(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const calificacion = await db.query(
        "SELECT * FROM calificaciones WHERE id_grupo = ?",
        id
      );
      res.json(calificacion);
    } catch (error) {
      console.error("Error al ejecutar la consulta MySQL:", error);
      res.status(500).send("Error interno del servidor");
    }
  }
  public async listAll(req: Request, res: Response): Promise<void> {
    try {
      const calificacion = await db.query("SELECT * FROM calificaciones");
      res.json(calificacion);
    } catch (error) {
      console.error("Error al ejecutar la consulta MySQL:", error);
      res.status(500).send("Error interno del servidor");
    }
  }

  public async listOne(req: Request, res: Response) {
    const id = req.params.id;
    const idG = req.params.idG;

    try {
      const calificacion = await db.query(
        "SELECT * FROM calificaciones WHERE id_alumno=? AND id_grupo=?",
        [id, idG]
      );
      res.json(calificacion);
    } catch (error) {
      console.error("Error al ejecutar la consulta MySQL:", error);
      res.status(500).send("Error interno del servidor");
    }
  }

  public async listOneFecha(req: Request, res: Response) {
    const id = req.params.id;

    try {
      const calificacion = await db.query(
        "SELECT * FROM calificaciones WHERE id_calificacion=?",
        id
      );
      res.json(calificacion);
    } catch (error) {
      console.error("Error al ejecutar la consulta MySQL:", error);
      res.status(500).send("Error interno del servidor");
    }
  }

  public async addCalificacion(req: Request, res: Response) {
    let calif = req.body.calificacion;
    let fecha = req.body.fecha_calif;
    let grupo = req.body.id_grupo;

    try {
      let calificacion = await db.query(
        "Select * from calificaciones where id_alumno = ? AND fecha_calif = ? AND id_grupo=?",
        [req.body.id_alumno, req.body.fecha_calif, grupo]
      );
      let numero: string = "";
      let num: number = 0; //numero para saber si hay calificacion repetido al mismo alumno en la misma fecha

      for (numero in calificacion[0]) {
        num = parseInt(numero) + 1;
      }
      if (num > 0) {
        res.status(401).json({
          msg: "Calificacion ya agregada , favor de actualizar calificacion",
        });
        console.log(num);
        console.log(req.body);
      } else {
        if (calif < 0 || calif > 100 || calif === "" || fecha == "") {
          res.status(400).json({ msg: "Error en las calificaciones o fecha" });
          console.log(req.body);
        } else {
          try {
            await db.query("INSERT INTO calificaciones SET ?", [req.body]);
            res.json({ text: "Grade added" });
            console.log(req.body);
          } catch (error) {
            console.error("Error al ejecutar la consulta MySQL:", error);
            res.status(500).send("Error al insertar calificacion");
          }
        }
      }
    } catch (error) {
      console.error("Error al ejecutar la consulta MySQL:", error);
      res.status(500).send("Error interno del servidor");
    }

    /*
    let calificacion = await db.query("Select * from calificaciones where id_alumno = ?AND fecha_calif = ?", [req.body.id_alumno,req.body.fecha_calif]);
    let numero : string="" ;
    let num : number = 0; //numero para saber si hay calificacion repetido al mismo alumno en la misma fecha
    
    for( numero in calificacion[0]) {
     
       num = parseInt(numero)+1;
       
    }
    if(num>0)
    {
      res.json({text:"Calificacion ya agregada "});
      console.log(num);
      console.log(req.body);
    } else {
    if (calif < 0 || calif > 100 || calif === "") {
      res.json({text:"error en la califacion"});
      console.log(req.body);
    } else {
      await db.query("INSERT INTO calificaciones SET ?", [
        req.body
      ]);
      res.json({ text: "Grade added" });
      console.log(req.body);
    }
  }
  */
  }

  public async deleteCalificacion(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await db.query("DELETE FROM calificaciones WHERE id_calificacion=?", [
        id,
      ]);
      res.json({ text: "Grade deleted" });
    } catch (error) {
      console.error("Error al ejecutar la consulta MySQL:", error);
      res.status(500).send("Error interno del servidor");
    }
  }

  public async updateCalificacion(req: Request, res: Response) {
    const { id } = req.params;
    const datos = req.body;
    try {
      await db.query("UPDATE calificaciones SET ? WHERE id_calificacion = ?", [
        datos,
        id,
      ]);
      res.json({ message: "Grade updated" });
    } catch (error) {
      console.error("Error al ejecutar la consulta MySQL:", error);
      res.status(500).send("Error interno del servidor");
    }
  }
}

export const calificacionController = new CalificacionController();
export default calificacionController;
