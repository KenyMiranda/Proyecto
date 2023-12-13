import { Request, Response } from "express";
import db from "../database";
class AlumnoGrupoController {

    public async list(req: Request, res: Response): Promise<void> {
      const { id } = req.params;
        try {
          const clase = await db.query(
            "SELECT id_user,first_nameU,last_nameU,last_nameU2,c.id_grupo from users u JOIN clase c ON u.id_user = c.id_alumno WHERE c.id_grupo =?;",id
          );
          res.json(clase);
        } catch (error) {
          console.error("Error al ejecutar la consulta MySQL:", error);
          res.status(500).send("Error interno del servidor");
        }
      }

      public async listOne(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
          try {
            const clase = await db.query(
              "SELECT * FROM clase c JOIN grupo g ON c.id_grupo = g.id_grupo WHERE c.id_alumno=? GROUP BY g.id_grupo;",id
            );
            res.json(clase);
          } catch (error) {
            console.error("Error al ejecutar la consulta MySQL:", error);
            res.status(500).send("Error interno del servidor");
          }
        }

        public async delete(req: Request, res: Response): Promise<void> {
          const { id } = req.params;
          const { idG } = req.params;
          try {
            const clase = await db.query(
              "DELETE FROM clase WHERE id_alumno =? AND id_grupo=?;",[id,idG]
            );
            res.json("Alumno deleted");
          } catch (error) {
            console.error("Error al ejecutar la consulta MySQL:", error);
            res.status(500).send("Error interno del servidor");
          }

        }

}

export const alumnoGrupoController = new AlumnoGrupoController();
export default alumnoGrupoController;