import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { HeroSlide } from './hero-slide.interface';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private http = inject(HttpClient);

  private baseUrl = 'http://localhost:3000';
  private apiUrl = `${this.baseUrl}/api/hero-slides?sort=_order`;

  getHeroSlides(): Observable<HeroSlide[]> {
    return this.http.get<any>(this.apiUrl).pipe(
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