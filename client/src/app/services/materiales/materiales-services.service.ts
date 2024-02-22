import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MaterialesServicesService {
  API_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  postFile(formData: FormData) {
    const token = localStorage.getItem('token');

    return this.http.post(`${this.API_URL}/file`, formData);
  }

  getFiles(): Observable<string[]> {
    return this.http.get<string[]>(`${this.API_URL}/file`);
  }

  deleteFile(filename: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/file/${filename}`);
  }
}
