import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    const token = localStorage.getItem('token');

    const header = new HttpHeaders().set('authorization', `Bearer ${token}`);
    return this.http.get(`${this.API_URL}/horario`,{ headers:header });
  }

  //OBTENER HORARIO ESPECIFICO
  getHorario(id: string){
    const token = localStorage.getItem('token');

    const header = new HttpHeaders().set('authorization', `Bearer ${token}`);
    return this.http.get(`${this.API_URL}/horario/${id}`,{ headers:header });

  }

  //GUARDAR HORARIO

  saveHorario(horario: Horario){
    const token = localStorage.getItem('token');

    const header = new HttpHeaders().set('authorization', `Bearer ${token}`);
    return this.http.post(`${this.API_URL}/horario`,horario,{ headers:header });
  }



  //BORRAR HORARIO
  deleteHorario(id : string) {
    const token = localStorage.getItem('token');

    const header = new HttpHeaders().set('authorization', `Bearer ${token}`);
    return this.http.delete(`${this.API_URL}/horario/${id}`,{ headers:header });
  }

  //ACTUALIZAR HORARIO

  updateHorario(id : number|undefined, updatedHorario:Horario){
    const token = localStorage.getItem('token');

    const header = new HttpHeaders().set('authorization', `Bearer ${token}`);
    return this.http.put(`${this.API_URL}/horario/${id}`,updatedHorario,{ headers:header });
  }

}
