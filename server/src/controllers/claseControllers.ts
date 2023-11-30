import { Request, Response } from "express";
import db from "../database";

class ClaseController {
  public async list(req: Request, res: Response): Promise<void> {
    const clase = await db.query(
      "SELECT * FROM clases c JOIN grupos g ON c.id_grupo = g.id_grupo GROUP BY g.id_grupo;"
    );
    res.json(clase);
  }

  public async listOne(req: Request, res: Response) {
    const { id } = req.params;
    const clase = await db.query("SELECT * FROM clases WHERE id_clase=?", [id]);
    res.json(clase);
  }

  public async addClase(req: Request, res: Response) {
    let alumnoId = req.body.id_alumno;
    let maestro = req.body.id_maestro;
    let maestro2 = req.body.id_maestro2;
    let grupo = req.body.id_grupo;

    /*
    let alumnoArray = await db.query(
      "Select * from clases where id_alumno = ? AND ",
      alumnoId
    );
    let alumno = JSON.parse(JSON.stringify(alumnoArray[0]));
    console.log(alumno[0]);

    try {
      if (alumno[0]) {
        return res.status(400).json({
          msg: "Alumno Inscrito en otra clase",
        });
      }
    } catch (error) {
      console.error("Error al ejecutar la consulta MySQL:", error);
      res.status(500).send("Error interno del servidor");
    }
    */
    console.log(maestro);
    console.log(maestro2);

    try {
      if (maestro2 == 0) {
        req.body.id_maestro2 = req.body.id_maestro;
      }
      if (maestro == 0 || grupo == 0) {
        return res.status(400).json({
          msg: "Favor de llenar los campos",
        });
      } else {
        const clase = await db.query("INSERT INTO clases SET ?", [req.body]);
  
        res.json({ message: "Registros insertados correctamente" });
      }
    } catch (error) {
      console.error("Error al ejecutar la consulta MySQL:", error);
      res.status(500).send("Error interno del servidor");
    }
   
  }

  public async deleteClase(req: Request, res: Response) {
    const id = req.params.id;

    const clase = await db.query("Delete from clases where id_clase = ?", id);
    res.json({ text: "Clase eliminada" });
  }

  public async updateClase(req: Request, res: Response) {
    const id = req.params.id;
    const datos = req.body;
    await db.query("UPDATE clases SET ? WHERE id_clase = ?", [datos, id]);
    res.json({ message: "Clase updated" });
  }
}

export const claseController = new ClaseController();
export default claseController;
