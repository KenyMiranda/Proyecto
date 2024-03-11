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

  checkTagExists(tagName: string): Observable<{ exists: boolean }> {
    return this.http.get<{ exists: boolean }>(`${this.API_URL}/tags/check/${tagName}`);
  }

  getParentTags(): Observable<string[]> {
    return this.http.get<string[]>(`${this.API_URL}/tags/parent`);
  }
}
