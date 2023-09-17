import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Alumno } from 'src/app/models/alumnos';
@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  API_URL = 'http://localhost:3000';
  constructor(private http: HttpClient) {

   }

   //OBTENER TODOS LOS MAESTROS
   getAlumnos() {
      return this.http.get(`${this.API_URL}/alumno`);
   }

   //OBTENER UN MAESTROS

   getAlumno(id : string) {
    return this.http.get(`${this.API_URL}/alumno/${id}`);
   }

   //GUARDAR MAESTROS

   saveAlumno(user:Alumno){
    return this.http.post(`${this.API_URL}/alumno`,user);
   }

   //BORRAR MAESTROS 

    deleteAlumno(id : string) {
      return this.http.delete(`${this.API_URL}/alumno/${id}`);
    }

    //ACTUALIZAR MAESTROS

    updateAlumno(id : string , updatedUser:Alumno){
      return this.http.put(`${this.API_URL}/alumno/${id}`,updatedUser);
    }
}
