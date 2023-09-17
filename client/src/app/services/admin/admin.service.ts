import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from 'src/app/models/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  API_URL = 'http://localhost:3000';
  constructor(private http: HttpClient) {

   }

   //OBTENER TODOS LOS MAESTROS
   getAdmins() {
      return this.http.get(`${this.API_URL}/admin`);
   }

   //OBTENER UN MAESTROS

   getAdmin(id : string) {
    return this.http.get(`${this.API_URL}/admin/${id}`);
   }

   //GUARDAR MAESTROS

   saveAdmin(user:Admin){
    return this.http.post(`${this.API_URL}/admin`,user);
   }

   //BORRAR MAESTROS 

    deleteAdmin(id : string) {
      return this.http.delete(`${this.API_URL}/admin/${id}`);
    }

    //ACTUALIZAR MAESTROS

    updateAdmin(id : string , updatedUser:Admin){
      return this.http.put(`${this.API_URL}/admin/${id}`,updatedUser);
    }
}
