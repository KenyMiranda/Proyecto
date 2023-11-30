import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Horario } from 'src/app/models/horarios';

@Injectable({
  providedIn: 'root',
})
export class HorariosService {
  API_URL = 'http://localhost:3000';
  constructor(private http: HttpClient) {

  }

  //OBTENER HORARIOS

  getHorarios() {
    return this.http.get(`${this.API_URL}/horario`);
  }

  //OBTENER HORARIO ESPECIFICO
  getHorario(id: string){
    return this.http.get(`${this.API_URL}/horario/${id}`);

  }

  //GUARDAR HORARIO

  saveHorario(horario: Horario){
    return this.http.post(`${this.API_URL}/horario`,horario);
  }



  //BORRAR HORARIO
  deleteHorario(id : string) {
    return this.http.delete(`${this.API_URL}/horario/${id}`);
  }

  //ACTUALIZAR HORARIO

  updateHorario(id : number|undefined, updatedHorario:Horario){
    return this.http.put(`${this.API_URL}/horario/${id}`,updatedHorario);
  }

}
