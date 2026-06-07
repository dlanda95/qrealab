// ============================================================
//  VIGILANCE — Service
//  Consume la API de Payload CMS (colección: vigilance)
// ============================================================

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { VigilanceData } from '../models/vigilance.interface';
import { HeroSlide }     from '../../../shared/models/hero-slide.interface';
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
          slides: (doc.slides ?? []).map((s: any) => ({
            tag:      s.tag,
            title:    s.title,
            subtitle: s.subtitle,
            ctaText:  s.ctaText,
            ctaLink:  s.ctaLink,
            image:    s.image?.url
              ? (s.image.url.startsWith('http') ? s.image.url : `${this.base}${s.image.url}`)
              : '',
          })),
          infoBlocks: (doc.infoBlocks ?? []).map((b: any) => ({
            title: b.title,
            style: b.style ?? 'bullet',
            items: (b.items ?? []).map((i: any) => ({ text: i.text })),
          })),
        };
      })
    );
  }

  /** Mapea los slides de vigilancia al formato HeroSlide (reutiliza hero-carousel). */
  toHeroSlides(data: VigilanceData): HeroSlide[] {
    return data.slides.map((s, i) => ({
      id:       i + 1,
      image:    s.image,
      tag:      s.tag,
      title:    s.title,
      subtitle: s.subtitle,
      cta:      s.ctaText && s.ctaLink
                  ? { text: s.ctaText, link: s.ctaLink }
                  : undefined,
    }));
  }
}
