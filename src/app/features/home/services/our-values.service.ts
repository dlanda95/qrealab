// ============================================================
//  OUR VALUES — Service
//  Consume la API de Payload CMS (colección: our-values)
// ============================================================

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { OurValuesSection } from '../models/our-values.interface';
import { LanguageService } from '../../../core/i18n/language.service';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class OurValuesService {
  private http = inject(HttpClient);
  private lang = inject(LanguageService);
  private base = environment.apiUrl;

  getOurValues(): Observable<OurValuesSection> {
    const apiUrl = `${this.base}/api/our-values?locale=${this.lang.currentLang()}`;
    return this.http.get<any>(apiUrl).pipe(
      map(res => {
        const doc = res.docs[0];
        return {
          sectionTitle: doc.sectionTitle,
          image: doc.image?.url,
          values: (doc.values ?? []).map((v: any) => ({
            id:     v.id,
            title:  v.title,
            icon:   v.icon,
            points: (v.points ?? []).map((p: any) => ({
              label:       p.label,
              description: p.description
            }))
          }))
        };
      })
    );
  }
}
