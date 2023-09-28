import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Maestro } from 'src/app/models/maestros';

@Injectable({
  providedIn: 'root'
})
export class MaestrosService {

  
  API_URL = 'http://localhost:3000';
  constructor(private http: HttpClient) {

   }

   //OBTENER TODOS LOS MAESTROS
   getMaestros() {
      return this.http.get(`${this.API_URL}/maestro`);
   }

   //OBTENER UN MAESTROS

   getMaestro(id : string) {
    return this.http.get(`${this.API_URL}/maestro/${id}`);
   }

   //GUARDAR MAESTROS

   saveMaestro(user:Maestro){
    return this.http.post(`${this.API_URL}/maestro`,user);
   }

   //BORRAR MAESTROS 

    deleteMaestro(id : number) {
      return this.http.delete(`${this.API_URL}/maestro/${id}`);
    }

    //ACTUALIZAR MAESTROS

    updateMaestro(id : string , updatedUser:Maestro){
      return this.http.put(`${this.API_URL}/maestro/${id}`,updatedUser);
    }
}
