import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import {Clase} from '../../models/clases';

@Injectable({
  providedIn: 'root'
})

export class ClasesService {

  API_URL = 'http://localhost:3000';
  constructor(private http: HttpClient) {

   }

   //OBTENER TODOS LOS USUARIOS 
   getClases() {
      return this.http.get(`${this.API_URL}/clase`);
   }

   //OBTENER UN USUARIO 

   getClase(id : string) {
    return this.http.get(`${this.API_URL}/clase/${id}`);
   }

   //GUARDAR USUARIO 

   saveClase(clase:Clase){
    return this.http.post(`${this.API_URL}/clase`,clase);
   }

   //BORRAR USUARIO 

    deleteClase(id : string) {
      return this.http.delete(`${this.API_URL}/clase/${id}`);
    }

    //ACTUALIZAR USUARIO

    updateClase(id : undefined|number , updatedClase:Clase){
      return this.http.put(`${this.API_URL}/clase/${id}`,updatedClase);
    }
}
