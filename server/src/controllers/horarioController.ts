import { Request, Response } from "express";
import db from "../database";
import moment from "moment";
class HorarioController {
  public async list(req: Request, res: Response): Promise<void> {
    const horario = await db.query("SELECT * FROM horarios ORDER BY Hora_inicio ASC");
    
    res.json(horario);
  }
  public async listOne(req: Request, res: Response) {
    const { id } = req.params;
    const horario = await db.query(
      "SELECT * FROM horarios WHERE id_horario=?",
      [id]
    );
    res.json(horario);
  }

  public async createHorario(req: Request, res: Response) {
    const hora_inicio = req.body.Hora_inicio;
    const hora_final = req.body.Hora_final;

    const momentTiempo1 = moment(hora_inicio, "HH:mm:ss");
    const momentTiempo2 = moment(hora_final, "HH:mm:ss");
    const dia = req.body.dia;
    const maestro = req.body.id_maestro;
    
    
    let horario  = await db.query("SELECT * FROM horarios where Hora_inicio=? AND dia = ? AND idioma =? AND nivel=? ",[hora_inicio, dia,req.body.idioma,req.body.nivel,req.body.id_maestro]);
    let horario2  = await db.query("SELECT * FROM horarios where Hora_inicio=? AND id_maestro=? AND dia = ?",[hora_inicio,maestro,dia]);
    let numero : string="" ;
    let num : number = 0; //numero para saber si hay horario repetido
    let numero2 : string="" ;
    let num2 : number = 0; //numero para saber si
    
    for( numero in horario[0]) {
     
       num = parseInt(numero)+1;
       
    }
    

    for( numero2 in horario2[0]) {
     
      num2 = parseInt(numero2)+1;
      
   }

    const diferenciaHoras = momentTiempo2.diff(momentTiempo1, "hours");
    const diferenciaMinutos = momentTiempo2.diff(momentTiempo1, "minutes");
    if ( diferenciaHoras == 1 && diferenciaMinutos == 60 && (dia == "Monday-Wednesday" ||dia=="Tuesday-Thursday") && num==0 && num2==0) {
      await db.query("INSERT INTO horarios SET ?", [req.body]);
      res.json({ text: "Horario Created" });
    }else if (diferenciaHoras == 4 && diferenciaMinutos == 240 &&  dia == "Saturday" &&  num==0 ) {
      await db.query("INSERT INTO horarios SET ?", [req.body]);
      res.json({ text: "Horario Created" });
    } else {
      res.json({ text: "Error en la cantidad de horas o horario empalmado" });
    }

    console.log(`La diferencia es: ${diferenciaHoras} horas y ${diferenciaMinutos} minutos`);
    console.log(num);
      
    
  }

  public async deleteHorario(req: Request, res: Response) {
    const { id } = req.params;
    await db.query("DELETE FROM horarios WHERE id_horario= ?", [id]);
    res.json({ text: "Horario deleted" });
  }

  public async updateHorario(req: Request, res: Response) {
    const { id } = req.params;
    const datos = req.body;
    await db.query("UPDATE horarios SET ? WHERE id_horario = ?", [datos, id]);
    res.json({ message: "Horario updated" });
  }


}

export const horarioController = new HorarioController();
export default horarioController;
