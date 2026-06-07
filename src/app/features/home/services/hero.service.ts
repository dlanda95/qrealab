import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { HeroSlide } from '../../../shared/models/hero-slide.interface';
import { LanguageService } from '../../../core/i18n/language.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private http = inject(HttpClient);
  private lang = inject(LanguageService);

  private baseUrl = environment.apiUrl;

  getHeroSlides(): Observable<HeroSlide[]> {
    const apiUrl = `${this.baseUrl}/api/hero-slides?sort=_order&locale=${this.lang.currentLang()}`;
    return this.http.get<any>(apiUrl).pipe(
      map(response => {
        return response.docs.map((doc: any) => ({
          id: doc.id,
          image: doc.image?.url?.startsWith('http')
            ? doc.image.url
            : `${this.baseUrl}${doc.image?.url}`,
          tag: doc.tag,
          title: doc.title,
          subtitle: doc.subtitle,
          cta: doc.ctaText && doc.ctaLink
            ? { text: doc.ctaText, link: doc.ctaLink }
            : undefined
        }));
      })
    );
  }
}
