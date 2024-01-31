import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    const token = localStorage.getItem('token');

    const header = new HttpHeaders().set('authorization', `Bearer ${token}`);
    

    
      return this.http.get(`${this.API_URL}/alumno`,{ headers:header });
   }

   //OBTENER UN MAESTROS

   getAlumno(id : string) {
    const token = localStorage.getItem('token');

    const header = new HttpHeaders().set('authorization', `Bearer ${token}`);
    return this.http.get(`${this.API_URL}/alumno/${id}`,{ headers:header });
   }

   //GUARDAR MAESTROS

   saveAlumno(user:Alumno){
    const token = localStorage.getItem('token');

    const header = new HttpHeaders().set('authorization', `Bearer ${token}`);
    return this.http.post(`${this.API_URL}/alumno`,user,{ headers:header });
   }

   //BORRAR MAESTROS 

    deleteAlumno(id : string) {
      const token = localStorage.getItem('token');

      const header = new HttpHeaders().set('authorization', `Bearer ${token}`);
      return this.http.delete(`${this.API_URL}/alumno/${id}`,{ headers:header });
    }

    //ACTUALIZAR MAESTROS

    updateAlumno(id : string , updatedUser:Alumno){
      const token = localStorage.getItem('token');

      const header = new HttpHeaders().set('authorization', `Bearer ${token}`);
      return this.http.put(`${this.API_URL}/alumno/${id}`,updatedUser,{ headers:header });
    }
}
