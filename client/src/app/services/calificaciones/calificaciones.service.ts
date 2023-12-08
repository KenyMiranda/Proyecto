import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import {Calificacion} from '../../models/calificaciones';
@Injectable({
  providedIn: 'root'
})
export class CalificacionesService {

  API_URL = 'http://localhost:3000';
  constructor(private http: HttpClient) {

   }

   //OBTENER TODOS LOS USUARIOS 
   getCalificaciones(id : string) {
    const token = localStorage.getItem('token');

    const header = new HttpHeaders().set('authorization', `Bearer ${token}`);
      return this.http.get(`${this.API_URL}/calificacion/${id}`);
   }

   //OBTENER UN USUARIO 

   getCalificacion(idG:string,id : string) {
    const token = localStorage.getItem('token');

    const header = new HttpHeaders().set('authorization', `Bearer ${token}`);
    return this.http.get(`${this.API_URL}/calificacion/${idG}/${id}`);
   }

   //GUARDAR USUARIO 

   saveCalificacion(calificacion:Calificacion){
    const token = localStorage.getItem('token');

    const header = new HttpHeaders().set('authorization', `Bearer ${token}`);
    return this.http.post(`${this.API_URL}/calificacion`,calificacion);
   }

   //BORRAR USUARIO 

    deleteCalificacion(id : string) {
      const token = localStorage.getItem('token');

      const header = new HttpHeaders().set('authorization', `Bearer ${token}`);
      return this.http.delete(`${this.API_URL}/calificacion/${id}`);
    }

    //ACTUALIZAR USUARIO

    updateCalificacion(id : undefined|number , updatedCalificacion:Calificacion){
      const token = localStorage.getItem('token');

      const header = new HttpHeaders().set('authorization', `Bearer ${token}`);
      return this.http.put(`${this.API_URL}/calificacion/${id}`,updatedCalificacion);
    }
}
