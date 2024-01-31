import { Request, Response } from "express";
import db from "../database";

class GrabacionController {
  public async list(req: Request, res: Response): Promise<void> {
    try {
      const grabacion = await db.query("SELECT * FROM grabaciones");
      res.json(grabacion);
    } catch (error) {
      console.error("Error al ejecutar la consulta MySQL:", error);
      res.status(500).send("Error interno del servidor");
    }
  }

  public async listOne(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    try {
      const grabacion = await db.query(
        "SELECT * FROM grabaciones where id_clase =?",
        id
      );
      res.json(grabacion);
    } catch (error) {
      console.error("Error al ejecutar la consulta MySQL:", error);
      res.status(500).send("Error interno del servidor");
    }
  }

  public async listRecording(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const fecha = req.params.fecha;
    try {
      const grabacion = await db.query(
        "SELECT *FROM grabaciones g JOIN clase c ON g.id_clase = c.id_clase WHERE c.id_grupo =? AND g.fecha =?;",
        [id, fecha]
      );
      res.json(grabacion);
    } catch (error) {
      console.error("Error al ejecutar la consulta MySQL:", error);
      res.status(500).send("Error interno del servidor");
    }
  }

  public async deleteG(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    try {
      const grabacion = await db.query(
        "DELETE FROM grabaciones where id_grabaciones =?",
        id
      );
      res.json("Grabacion eliminada");
    } catch (error) {
      console.error("Error al ejecutar la consulta MySQL:", error);
      res.status(500).send("Error interno del servidor");
    }
  }

  public async updateG(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    let datos = req.body;
    try {
      const grabacion = await db.query(
        "UPDATE FROM grabaciones SET =? where id_grabaciones =?",
        [datos, id]
      );
      res.json("Grabacion actualizada");
    } catch (error) {
      console.error("Error al ejecutar la consulta MySQL:", error);
      res.status(500).send("Error interno del servidor");
    }
  }

  public async addGrabacion(req: Request, res: Response) {
    let fecha = req.body.fecha;
    let grupo = req.body.id_clase;
    console.log(grupo);
    try {
     
      const fechaG = await db.query(
        "SELECT DISTINCT g.fecha_inicio, g.fecha_final from clase c JOIN grupo g ON c.id_grupo = g.id_grupo WHERE c.id_clase =?;",
        grupo
      );
      
      let fechaG2 = JSON.parse(JSON.stringify(fechaG[0]));
     
      const fecha_inicio = fechaG2[0].fecha_inicio;
      const fecha_final = fechaG2[0].fecha_final;
      if (fecha < fecha_inicio.substring(10,0) || fecha > fecha_final.substring(10,0)) {
        
        res.status(400).json({
          msg: "Fecha fuera del rango de clases",
        });
      } else {
        const grabacion = await db.query("INSERT INTO grabaciones SET ?", [
          req.body,
        ]);
        res.json({ text: "Grabacion" });
      }
    } catch (error) {
      console.error("Error al ejecutar la consulta MySQL:", error);
      res.status(500).send("Error interno del servidor");
    }
  }
}

export const grabacionController = new GrabacionController();
export default grabacionController;
