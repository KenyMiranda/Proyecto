import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
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
      return this.http.get(`${this.API_URL}/grupo`);
   }

   //OBTENER UN USUARIO 

   getGrupo(id : string) {
    return this.http.get(`${this.API_URL}/grupo/${id}`);
   }

   //GUARDAR USUARIO 

   saveGrupo(grupo:Grupo){
    return this.http.post(`${this.API_URL}/grupo`,grupo);
   }

   //BORRAR USUARIO 

    deleteGrupo(id : string) {
      return this.http.delete(`${this.API_URL}/grupo/${id}`);
    }

    //ACTUALIZAR USUARIO

    updateGrupo(id : undefined|number , updatedGrupo:Grupo){
      return this.http.put(`${this.API_URL}/grupo/${id}`,updatedGrupo);
    }
}

