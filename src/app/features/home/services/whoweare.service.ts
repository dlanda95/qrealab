import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { LanguageService } from '../../../core/i18n/language.service';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class WhoweareService {
  private http = inject(HttpClient);
  private lang = inject(LanguageService);
  private base = environment.apiUrl;

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
