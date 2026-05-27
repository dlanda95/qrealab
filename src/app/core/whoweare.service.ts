import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WhoweareService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/whoweare';

  getWhoweare() {
    return this.http.get<any>(this.apiUrl).pipe(
      map(res => {
        const doc = res.docs[0];
        return {
          title: doc.title,
          description: doc.description.split('\n'), // Angular lo recibe como arreglo de líneas
          image: doc.image.url
        };
      })
    );
  }
}