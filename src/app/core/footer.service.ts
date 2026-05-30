// ============================================================
//  FOOTER — Service
//  Consume la API de Payload CMS (colección: footer)
// ============================================================

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { FooterData } from './footer.interface';

@Injectable({ providedIn: 'root' })
export class FooterService {
  private http   = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/footer';

  getFooter(): Observable<FooterData> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(res => {
        const doc = res.docs[0];
        return {
          brandDescription: doc.brandDescription ?? '',
          socialLinks: (doc.socialLinks ?? []).map((s: any) => ({
            label: s.label,
            url:   s.url,
          })),
          linkColumns: (doc.linkColumns ?? []).map((col: any) => ({
            title: col.title,
            links: (col.links ?? []).map((l: any) => ({
              label: l.label,
              url:   l.url,
            })),
          })),
          contactTitle:  doc.contactTitle  ?? 'Contacto',
          address:       (doc.address ?? '').split('\n').filter((l: string) => l.trim()),
          contactEmail:  doc.contactEmail  ?? '',
          copyrightText: doc.copyrightText ?? '',
        };
      })
    );
  }
}
