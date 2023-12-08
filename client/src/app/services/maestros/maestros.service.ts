import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Maestro } from 'src/app/models/maestros';

@Injectable({
  providedIn: 'root',
})
export class MaestrosService {
  API_URL = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  //OBTENER TODOS LOS MAESTROS
  getMaestros() {
    const token = localStorage.getItem('token');

    const header = new HttpHeaders().set('authorization', `Bearer ${token}`);

    return this.http.get(`${this.API_URL}/maestro`, { headers: header });
  }

  //OBTENER UN MAESTROS

  getMaestro(id: string) {
    const token = localStorage.getItem('token');

    const header = new HttpHeaders().set('authorization', `Bearer ${token}`);

    return this.http.get(`${this.API_URL}/maestro/${id}`, { headers: header });
  }

  //GUARDAR MAESTROS

  saveMaestro(user: Maestro) {
    const token = localStorage.getItem('token');

    const header = new HttpHeaders().set('authorization', `Bearer ${token}`);
    return this.http.post(`${this.API_URL}/maestro`, user, { headers: header });
  }

  //BORRAR MAESTROS

  deleteMaestro(id: number) {
    const token = localStorage.getItem('token');

    const header = new HttpHeaders().set('authorization', `Bearer ${token}`);
    return this.http.delete(`${this.API_URL}/maestro/${id}`, {
      headers: header,
    });
  }

  //ACTUALIZAR MAESTROS

  updateMaestro(id: string, updatedUser: Maestro) {
    const token = localStorage.getItem('token');

    const header = new HttpHeaders().set('authorization', `Bearer ${token}`);
    return this.http.put(`${this.API_URL}/maestro/${id}`, updatedUser, {
      headers: header,
    });
  }
}
