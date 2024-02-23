import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import JSZip from 'jszip';

@Injectable({
  providedIn: 'root',
})
export class MaterialesServicesService {
  API_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  postFiles(formData: FormData) {
    const token = localStorage.getItem('token');

    return this.http.post(`${this.API_URL}/file`, formData);
  }

  getFiles(): Observable<string[]> {
    return this.http.get<string[]>(`${this.API_URL}/file`);
  }

  deleteFile(filename: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/file/${filename}`);
  }

  downloadAllFiles(): Observable<Blob> {
    return new Observable<Blob>((observer) => {
      const zip = new JSZip();
      const folder = zip.folder('archivos');
      this.getFiles().subscribe({
        next: (files: string[]) => {
          const requests = files.map((file: string) =>
            fetch(`${this.API_URL}/uploads/${file}`).then((response) =>
              response.blob().then((blob) => folder?.file(file, blob))
            )
          );
          Promise.all(requests).then(() =>
            zip.generateAsync({ type: 'blob' }).then((content: Blob) => {
              observer.next(content);
              observer.complete();
            })
          );
        },
        error: (error) => observer.error(error),
      });
    });
  }
}
