import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagManagerService {
  API_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  postTag(tagData: any): Observable<any> {
    console.log("Probando");
    return this.http.post(`${this.API_URL}/tags`, tagData);
  }
}
