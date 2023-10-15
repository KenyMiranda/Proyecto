import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import {Calificacion} from '../../models/calificaciones';
@Injectable({
  providedIn: 'root'
})
export class CalificacionesService {

  API_URL = 'http://localhost:3000';
  constructor(private http: HttpClient) {

   }

   //OBTENER TODOS LOS USUARIOS 
   getCalificaciones() {
      return this.http.get(`${this.API_URL}/calificacion`);
   }

   //OBTENER UN USUARIO 

   getCalificacion(id : string) {
    return this.http.get(`${this.API_URL}/calificacion/${id}`);
   }

   //GUARDAR USUARIO 

   saveCalificacion(calificacion:Calificacion){
    return this.http.post(`${this.API_URL}/calificacion`,calificacion);
   }

   //BORRAR USUARIO 

    deleteCalificacion(id : string) {
      return this.http.delete(`${this.API_URL}/calificacion/${id}`);
    }

    //ACTUALIZAR USUARIO

    updateCalificacion(id : undefined|number , updatedCalificacion:Calificacion){
      return this.http.put(`${this.API_URL}/calificacion/${id}`,updatedCalificacion);
    }
}
