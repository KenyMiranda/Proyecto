import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlumnoGruposService {
  API_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

    //OBTENER TODOS LOS USUARIOS 
    getAlumnos(id:string) {
      const token = localStorage.getItem('token');

      const header = new HttpHeaders().set('authorization', `Bearer ${token}`);
      return this.http.get(`${this.API_URL}/alumnoGrupo/${id}`,{ headers:header });
   }

}
