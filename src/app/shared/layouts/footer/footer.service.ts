import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { FooterData } from './footer.interface';
import { LanguageService } from '../../../core/i18n/language.service';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class FooterService {
  private http = inject(HttpClient);
  private lang = inject(LanguageService);
  private base = environment.apiUrl;

  getFooter(): Observable<FooterData> {
    const apiUrl = `${this.base}/api/footer?locale=${this.lang.currentLang()}`;
    return this.http.get<any>(apiUrl).pipe(
      map(res => {
        const doc = res.docs?.[0] ?? {};
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
          contactEmails: (doc.contactEmails ?? []).map((e: any) => e.email).filter(Boolean),
          contactEmail:  doc.contactEmail  ?? '',
          copyrightText: doc.copyrightText ?? '',
        };
      })
    );
  }
}
