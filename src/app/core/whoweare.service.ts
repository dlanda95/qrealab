import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { LanguageService } from './language.service';

@Injectable({ providedIn: 'root' })
export class WhoweareService {
  private http = inject(HttpClient);
  private lang = inject(LanguageService);
  private base = 'http://localhost:3000';

  getWhoweare() {
    const apiUrl = `${this.base}/api/whoweare?locale=${this.lang.currentLang()}`;
    return this.http.get<any>(apiUrl).pipe(
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