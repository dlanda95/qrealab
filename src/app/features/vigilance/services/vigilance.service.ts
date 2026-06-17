import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { VigilanceData } from '../models/vigilance.interface';
import { LanguageService } from '../../../core/i18n/language.service';
import { environment } from '../../../../environments/environment';

const DEFAULT_VIGILANCE: VigilanceData = {
  heroEyebrow: '', heroTitulo: '', heroSubtitulo: '',
  infoEyebrow: '', infoTitulo: '', infoBlocks: [],
};

@Injectable({ providedIn: 'root' })
export class VigilanceService {

  private http = inject(HttpClient);
  private lang = inject(LanguageService);
  private base = environment.apiUrl;

  getVigilance(): Observable<VigilanceData> {
    return this.http.get<any>(`${this.base}/api/vigilance?locale=${this.lang.currentLang()}`).pipe(
      map(res => {
        const doc = res.docs?.[0];
        if (!doc) return DEFAULT_VIGILANCE;
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
      }),
      catchError(() => of(DEFAULT_VIGILANCE)),
    );
  }
}
