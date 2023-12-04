import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlumnoGruposService {
  API_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

    //OBTENER TODOS LOS USUARIOS 
    getAlumnos(id:string) {
      return this.http.get(`${this.API_URL}/alumnoGrupo/${id}`);
   }

}
