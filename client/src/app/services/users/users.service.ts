import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Users } from '../../models/users';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  API_URL = 'http://localhost:3000';
  constructor(private http: HttpClient,private router: Router) {}

  //OBTENER TODOS LOS USUARIOS
  getUsers() {
    //return this.http.get(`${this.API_URL}/user`);
    const token = localStorage.getItem('token');
   

    const header = new HttpHeaders().set('authorization', `Bearer ${token}`);

    return this.http.get(`${this.API_URL}/user`, { headers: header });
  }

  //OBTENER UN USUARIO

  getUser(id: string) {
    const token = localStorage.getItem('token');

    const header = new HttpHeaders().set('authorization', `Bearer ${token}`);
    return this.http.get(`${this.API_URL}/user/${id}`, { headers: header });
  }

  //GUARDAR USUARIO

  saveUser(user: Users) {
    const token = localStorage.getItem('token');

    const header = new HttpHeaders().set('authorization', `Bearer ${token}`);
    return this.http.post(`${this.API_URL}/user`, user, { headers: header });
  }

  //LOGIN USUARIO

  loginUser(user: Users) {
    return this.http.post(`${this.API_URL}/user/login`, user);
  }

  //BORRAR USUARIO

  deleteUser(id: string) {
    const token = localStorage.getItem('token');
   

    const header = new HttpHeaders().set('authorization', `Bearer ${token}`);
    return this.http.delete(`${this.API_URL}/user/${id}`, { headers: header });
  }

  //ACTUALIZAR USUARIO

  updateUser(id: number | undefined, updatedUser: Users) {
    const token = localStorage.getItem('token');

    const header = new HttpHeaders().set('authorization', `Bearer ${token}`);
    return this.http.put(`${this.API_URL}/user/${id}`, updatedUser, {
      headers: header,
    });
  }
}
