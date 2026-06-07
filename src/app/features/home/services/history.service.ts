import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { LanguageService } from '../../../core/i18n/language.service';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class HistoryService {
  private http = inject(HttpClient);
  private lang = inject(LanguageService);
  private base = environment.apiUrl;

  getHistory(): Observable<any> {
    const apiUrl = `${this.base}/api/history?locale=${this.lang.currentLang()}`;
    return this.http.get<any>(apiUrl).pipe(
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
