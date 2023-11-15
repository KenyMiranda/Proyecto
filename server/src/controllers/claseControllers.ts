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
    let alumnoId = req.body.id_alumno; 
    let maestro = req.body.id_maestro;
    let maestro2 = req.body.id_maestro2;
    let grupo = req.body.id_grupo;

    if(maestro ===0) res.json({ message: 'Ingresar Maestro' });

    if(maestro2 ===0){
      maestro2 = maestro;
    }

    if(grupo===0){
      res.json({ message: 'Ingresar Grupo' });
    }

    let alumnoArray = await db.query("Select * from clases where id_alumno = ?",alumnoId);
    let alumno = JSON.parse(JSON.stringify(alumnoArray[0]));

    if (alumno[0]) {
      return res.status(400).json({
        msg: "Alumno Inscrito en otra clase",
      });
    }

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
