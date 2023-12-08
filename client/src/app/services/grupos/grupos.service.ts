import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import {Grupo} from '../../models/grupos';

@Injectable({
  providedIn: 'root'
})

export class GruposService {

  API_URL = 'http://localhost:3000';
  constructor(private http: HttpClient) {

   }

   //OBTENER TODOS LOS USUARIOS 
   getGrupos() {
    const token = localStorage.getItem('token');

    const header = new HttpHeaders().set('authorization', `Bearer ${token}`);
      return this.http.get(`${this.API_URL}/grupo`,{ headers:header });
   }

   //OBTENER UN USUARIO 

   getGrupo(id : string) {
    const token = localStorage.getItem('token');

    const header = new HttpHeaders().set('authorization', `Bearer ${token}`);
    return this.http.get(`${this.API_URL}/grupo/${id}`,{ headers:header });
   }

   //GUARDAR USUARIO 

   saveGrupo(grupo:Grupo){
    const token = localStorage.getItem('token');

    const header = new HttpHeaders().set('authorization', `Bearer ${token}`);
    return this.http.post(`${this.API_URL}/grupo`,grupo,{ headers:header });
   }

   //BORRAR USUARIO 

    deleteGrupo(id : string) {
      const token = localStorage.getItem('token');

      const header = new HttpHeaders().set('authorization', `Bearer ${token}`);
      return this.http.delete(`${this.API_URL}/grupo/${id}`,{ headers:header });
    }

    //ACTUALIZAR USUARIO

    updateGrupo(id : undefined|number , updatedGrupo:Grupo){
      const token = localStorage.getItem('token');

      const header = new HttpHeaders().set('authorization', `Bearer ${token}`);
      return this.http.put(`${this.API_URL}/grupo/${id}`,updatedGrupo,{ headers:header });
    }
}

