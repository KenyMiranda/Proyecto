import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClasesHorariosService {
  API_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

    //OBTENER TODOS LOS USUARIOS 
    getClasesHorarios() {
      return this.http.get(`${this.API_URL}/claseHorario`);
   }

   //OBTENER UN USUARIO 

   getClaseHorario(id : string) {
    return this.http.get(`${this.API_URL}/claseHorario/${id}`);
   }
}
