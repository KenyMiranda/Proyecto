import { Request, Response } from "express";
import db from "../database";
import moment from "moment";
class HorarioController {
  public async list(req: Request, res: Response): Promise<void> {
    const horario = await db.query(
      "SELECT * FROM horarios ORDER BY Hora_inicio ASC"
    );

    res.json(horario);
  }
  public async listOne(req: Request, res: Response) {
    const { id } = req.params;
    const horario = await db.query(
      "select * from horarios h JOIN grupo g ON h.id_grupo = g.id_grupo WHERE g.id_maestro=?;",
      [id]
    );
    res.json(horario);
  }

  public async createHorario(req: Request, res: Response) {
    const hora_inicio = req.body.Hora_inicio;
    const hora_final = req.body.Hora_final;

    const momentTiempo1 = moment(hora_inicio, "HH:mm:ss");
    const momentTiempo2 = moment(hora_final, "HH:mm:ss");
    //const dia = req.body.dia;
    const grupo = req.body.id_grupo;
    const categoria = req.body.categoria

    try {
      let c_grupo = await db.query("SELECT categoria FROM grupo WHERE id_grupo =? ",grupo);
      let cat = JSON.parse(JSON.stringify(c_grupo[0]));
      console.log(cat[0].categoria);
      let categ = cat[0].categoria;
      req.body.dia = categ;
      /*
      let horario = await db.query(
        "SELECT * FROM horarios where Hora_inicio=? AND id_grupo=? AND dia = ? AND idioma =?",
        [hora_inicio, grupo, categ, req.body.idioma]
      );
      let numero: string = "";
      let num: number = 0; //numero para saber si hay horario repetido
      let numero2: string = "";
      let num2: number = 0; //numero para saber si

      for (numero in horario[0]) {
        num = parseInt(numero) + 1;
      }
      */
      const diferenciaHoras = momentTiempo2.diff(momentTiempo1, "hours");
      const diferenciaMinutos = momentTiempo2.diff(momentTiempo1, "minutes");
      if (
        diferenciaHoras == 1 &&
        diferenciaMinutos == 60 &&
        categ == "Monday-Thursday" 
        //num == 0
      ) {
        await db.query("INSERT INTO horarios SET ?", [req.body]);
        res.json({ text: "Horario Created" });
      } else if (
        diferenciaHoras == 4 &&
        diferenciaMinutos == 240 &&
        categ == "Saturday" 
        //num == 0
      ) {
        await db.query("INSERT INTO horarios SET ?", [req.body]);
        res.json({ text: "Horario Created" });
      } else {
       
        res.status(500).send("Error en la cantidad de horas o horario empalmado");
      }

      console.log(
        `La diferencia es: ${diferenciaHoras} horas y ${diferenciaMinutos} minutos`
      );
      //console.log(num);
      
    } catch (error) {
      console.log("asdas"+error);
      res.status(500).send("Error al ejecutar la consulta MySQL:");
    }
  }

  public async deleteHorario(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await db.query("DELETE FROM horarios WHERE id_horario= ?", [id]);
      res.json({ text: "Horario deleted" });
    } catch (error) {
      console.error("Error al ejecutar la consulta MySQL:", error);
      res.status(500).send("Error interno del servidor");
    }
  }

  public async updateHorario(req: Request, res: Response) {
    const { id } = req.params;
    const datos = req.body;
    const hora_inicio = req.body.Hora_inicio;
    const hora_final = req.body.Hora_final;

    const momentTiempo1 = moment(hora_inicio, "HH:mm:ss");
    const momentTiempo2 = moment(hora_final, "HH:mm:ss");
    const dia = req.body.dia;
    const grupo = req.body.id_grupo;

    try {
    

      const diferenciaHoras = momentTiempo2.diff(momentTiempo1, "hours");
      const diferenciaMinutos = momentTiempo2.diff(momentTiempo1, "minutes");
      if (
        diferenciaHoras == 1 &&
        diferenciaMinutos == 60 &&
        dia == "Monday-Thursday" 
        
      ) {
        await db.query("UPDATE horarios SET ? WHERE id_horario = ?", [datos, id]);
        res.json({ text: "Horario Created" });
      } else if (
        diferenciaHoras == 4 &&
        diferenciaMinutos == 240 &&
        dia == "Saturday" 
        
      ) {
        await db.query("UPDATE horarios SET ? WHERE id_horario = ?", [datos, id]);
        res.json({ text: "Horario Created" });
      } else {
       
        res.status(500).send("Error en la cantidad de horas o horario empalmado");
      }

      console.log(
        `La diferencia es: ${diferenciaHoras} horas y ${diferenciaMinutos} minutos`
      );
      
    } catch (error) {
      
      res.status(500).send("Error al ejecutar la consulta MySQL:");
    }

    /*
    try {
      await db.query("UPDATE horarios SET ? WHERE id_horario = ?", [datos, id]);
      res.json({ message: "Horario updated" });
    } catch (error) {
      console.error("Error al ejecutar la consulta MySQL:", error);
      res.status(500).send("Error interno del servidor");
    }
    */
  }
}

export const horarioController = new HorarioController();
export default horarioController;
