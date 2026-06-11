import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { VigilanceData } from '../models/vigilance.interface';
import { LanguageService } from '../../../core/i18n/language.service';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class VigilanceService {

  private http = inject(HttpClient);
  private lang = inject(LanguageService);
  private base = environment.apiUrl;

  getVigilance(): Observable<VigilanceData> {
    return this.http.get<any>(`${this.base}/api/vigilance?locale=${this.lang.currentLang()}`).pipe(
      map(res => {
        const doc = res.docs[0];
        return {
          heroEyebrow:   doc.heroEyebrow   ?? '',
          heroTitulo:    doc.heroTitulo    ?? '',
          heroSubtitulo: doc.heroSubtitulo ?? '',
          infoEyebrow:   doc.infoEyebrow   ?? '',
          infoTitulo:    doc.infoTitulo    ?? '',
          infoBlocks: (doc.infoBlocks ?? []).map((b: any) => ({
            title: b.title,
            style: b.style ?? 'bullet',
            items: (b.items ?? []).map((i: any) => ({ text: i.text })),
          })),
        };
      })
    );
  }
}
