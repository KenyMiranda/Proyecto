import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import {Users} from '../models/users';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  API_URL = 'http://localhost:3000';
  constructor(private http: HttpClient) {

   }

   //OBTENER TODOS LOS USUARIOS 
   getUsers() {
      return this.http.get(`${this.API_URL}/user`);
   }

   //OBTENER UN USUARIO 

   getUser(id : string) {
    return this.http.get(`${this.API_URL}/user/${id}`);
   }

   //GUARDAR USUARIO 

   saveUser(user:Users){
    return this.http.post(`${this.API_URL}/user`,user);
   }

   //BORRAR USUARIO 

    deleteUser(id : string) {
      return this.http.delete(`${this.API_URL}/user/${id}`);
    }

    //ACTUALIZAR USUARIO

    updateUser(id : string , updatedUser:Users){
      return this.http.put(`${this.API_URL}/user/${id}`,updatedUser);
    }
}
