import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TagManagerService {
  API_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  postTag(tagData: any): Observable<any> {
    console.log('Data de etiqueta:', tagData); // Agregado para depurar
    return this.http.post(`${this.API_URL}/tags`, tagData);
  }

  checkTagExists(tagName: string): Observable<{ exists: boolean }> {
    return this.http.get<{ exists: boolean }>(
      `${this.API_URL}/tags/check/${tagName}`
    );
  }

  getParentTags(): Observable<string[]> {
    return this.http.get<string[]>(`${this.API_URL}/tags/parent`);
  }

  getTagIdByName(tagName: string): Observable<number | null> {
    return this.http
      .get<number | null>(`${this.API_URL}/tags/course/${tagName}`)
      .pipe(
        tap((courseId) => console.log('Course ID:', courseId)) // Agrega este tap para depurar
      );
  }
}
