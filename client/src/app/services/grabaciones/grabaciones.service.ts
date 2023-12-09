import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Grabacion } from 'src/app/models/grabaciones';

@Injectable({
  providedIn: 'root'
})
export class GrabacionesService {

  API_URL = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

   //OBTENER TODOS LOS USUARIOS 
   getGrabaciones() {
    const token = localStorage.getItem('token');

    const header = new HttpHeaders().set('authorization', `Bearer ${token}`);
      return this.http.get(`${this.API_URL}/grabacion`,{ headers:header });
   }

   //OBTENER UN USUARIO 

   getGrabacion(id : string) {
    const token = localStorage.getItem('token');

    const header = new HttpHeaders().set('authorization', `Bearer ${token}`);
    return this.http.get(`${this.API_URL}/grabacion/${id}`,{ headers:header });
   }

   //GUARDAR USUARIO 

   saveGrabacion(grabacion:Grabacion){
    const token = localStorage.getItem('token');

    const header = new HttpHeaders().set('authorization', `Bearer ${token}`);
    return this.http.post(`${this.API_URL}/grabacion`,grabacion,{ headers:header });
   }

   //BORRAR USUARIO 

    deleteGrabacion(id : string) {
      const token = localStorage.getItem('token');

      const header = new HttpHeaders().set('authorization', `Bearer ${token}`);
      return this.http.delete(`${this.API_URL}/grabacion/${id}`,{ headers:header });
    }

    //ACTUALIZAR USUARIO

    updateGrabacion(id : undefined|number , grabacion:Grabacion){
      const token = localStorage.getItem('token');

      const header = new HttpHeaders().set('authorization', `Bearer ${token}`);
      return this.http.put(`${this.API_URL}/grabacion/${id}`,grabacion,{ headers:header });
    }
 
}
