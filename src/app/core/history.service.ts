import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HistoryService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/history'; // Ajusta la URL de tu API

  getHistory(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => {
        // Payload devuelve { docs: [...] }. Nos quedamos con el primero.
        const doc = response.docs[0];
        return {
          title: doc.title,
          description: doc.description.split('\n'), // Convertimos el textarea en array de párrafos
          image: doc.image.url
        };
      })
    );
  }
}