import { Request, Response } from "express";
import db from "../database";

class GrupoController {
  public async list(req: Request, res: Response): Promise<void> {
    const clase = await db.query("SELECT * FROM grupos");
    res.json(clase);
  }


  public async listOne(req: Request, res: Response) {
    const { id } = req.params;
    const clase = await db.query(
      "SELECT * FROM grupos WHERE id_grupo=?",
      [id]
    );
    res.json(clase);
  }

  public async addGrupo(req: Request, res: Response){


    const grupo = await db.query("INSERT INTO grupos SET ?", [req.body]);
    
      res.json({ message: 'Grupo agregado Correctamente' });

    


  }

  public async deleteGrupo(req: Request, res: Response){
    const id = req.params.id;


    const grupo = await db.query("Delete from grupos where id_grupo = ?", id);
    res.json({text:"Grupo eliminado"});
  }


  public async updateGrupo(req: Request, res: Response){
    const id = req.params.id;
    const datos = req.body;
    await db.query("UPDATE grupos SET ? WHERE id_grupo = ?", [datos, id]);
    res.json({ message: "Grupo updated" });


  }



}

export const grupoController = new GrupoController();
export default grupoController;
