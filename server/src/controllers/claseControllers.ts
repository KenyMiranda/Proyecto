import { Request, Response } from "express";
import db from "../database";

class ClaseController {
  public async list(req: Request, res: Response): Promise<void> {
    const clase = await db.query("SELECT * FROM clases");
    res.json(clase);
  }


  public async listOne(req: Request, res: Response) {
    const { id } = req.params;
    const clase = await db.query(
      "SELECT * FROM clases WHERE id_clase=?",
      [id]
    );
    res.json(clase);
  }

  public async addClase(req: Request, res: Response){
    let alumnoArray = req.body.id_alumno; 
    let maestro = req.body.id_maestro;
    let grupo = req.body.id_grupo;

    const clase = await db.query("INSERT INTO clases SET ?", [req.body]);
    
      res.json({ message: 'Registros insertados correctamente' });

    


  }

  public async deleteClase(req: Request, res: Response){
    const id = req.params.id;


    const clase = await db.query("Delete from clases where id_clase = ?", id);
    res.json({text:"Clase eliminada"});
  }


  public async updateClase(req: Request, res: Response){
    const id = req.params.id;
    const datos = req.body;
    await db.query("UPDATE clases SET ? WHERE id_clase = ?", [datos, id]);
    res.json({ message: "Clase updated" });


  }



}

export const claseController = new ClaseController();
export default claseController;
