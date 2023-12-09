import { Request, Response } from "express";
import db from "../database";

class GrabacionController {
  public async list(req: Request, res: Response): Promise<void> {
    const grabacion = await db.query("SELECT * FROM grabaciones");
    res.json(grabacion);
  }

  public async listOne(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const grabacion = await db.query("SELECT * FROM grabaciones where id_grabaciones =?",id);
    res.json(grabacion);
  }

  public async deleteG (req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const grabacion = await db.query("DELETE FROM grabaciones where id_grabaciones =?",id);
    
  }

  public async updateG(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    let datos = req.body;
    const grabacion = await db.query("UPDATE FROM grabaciones SET =? where id_grabaciones =?",[datos,id]);

    
  }

  public async addGrabacion(req: Request, res: Response){
    try {
        const grupo = await db.query("INSERT INTO grabaciones SET ?", [req.body]);
    } catch (error) {
        console.error("Error al ejecutar la consulta MySQL:", error);
        res.status(500).send("Error interno del servidor");
    }

  }

  
}

export const grabacionController = new GrabacionController();
export default grabacionController;
