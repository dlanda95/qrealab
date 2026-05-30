// ============================================================
//  OUR VALUES — Service
//  Consume la API de Payload CMS (colección: our-values)
// ============================================================

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { OurValuesSection } from './our-values.interface';

@Injectable({ providedIn: 'root' })
export class OurValuesService {
  private http   = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/our-values';

  getOurValues(): Observable<OurValuesSection> {
    return this.http.get<any>(this.apiUrl).pipe(
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
