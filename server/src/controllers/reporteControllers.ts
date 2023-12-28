import { Request, Response } from "express";
import db from "../database";

class ReporteController {
  public async listAlumnos_Maestro(req: Request, res: Response): Promise<void> {
    try {
      const list = await db.query(
        `SELECT 
        u.first_nameU,
        SUM(total_alumnos) AS total_alumnos
    FROM (
        SELECT 
            g.id_maestro AS id_maestro,
            COUNT(DISTINCT cl.id_alumno) AS total_alumnos
        FROM 
            grupo g
        LEFT JOIN 
            clase cl ON g.id_grupo = cl.id_grupo
        GROUP BY 
            g.id_maestro
        
        UNION ALL  -- Esto unirá el conteo de alumnos para el id_maestro2
        
        SELECT 
            g.id_maestro2 AS id_maestro,
            COUNT(DISTINCT cl.id_alumno) AS total_alumnos
        FROM 
            grupo g
        LEFT JOIN 
            clase cl ON g.id_grupo = cl.id_grupo
        WHERE 
            g.id_maestro != g.id_maestro2
        GROUP BY 
            g.id_maestro2
    ) AS subconsulta
    JOIN users u ON id_maestro = u.id_user
    GROUP BY 
        id_maestro;`
      );
      res.json(list);
    } catch (error) {
      console.error("Error al ejecutar la consulta MySQL:", error);
      res.status(500).send("Error interno del servidor");
    }
  }

  public async listAlumnos_Grupo(req: Request, res: Response): Promise<void> {
    try {
      const list = await db.query(
        `SELECT g.nombre_grupo,g.Idioma,COUNT(id_alumno) AS total_alumnos from clase c 
         JOIN grupo g ON c.id_grupo = g.id_grupo GROUP BY g.nombre_grupo,g.Idioma;
        `
      );
      res.json(list);
    } catch (error) {
      console.error("Error al ejecutar la consulta MySQL:", error);
      res.status(500).send("Error interno del servidor");
    }
  }
}

export const reporteController = new ReporteController();
export default reporteController;
