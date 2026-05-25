import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { HeroSlide } from './hero-slide.interface';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private http = inject(HttpClient);
  // Esta es la ruta automática que Payload creó para tu colección
  private apiUrl = 'http://localhost:3000/api/hero-slides';

  getHeroSlides(): Observable<HeroSlide[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => {
        // Transformamos lo que manda Payload a lo que necesita tu carrusel
        return response.docs.map((doc: any, index: number) => ({
          id: doc.id,
          image: 'http://localhost:3000' + doc.image.url, // URL completa de la foto
          tag: doc.tag,
          title: doc.title,
          subtitle: doc.subtitle,
          cta: doc.ctaText && doc.ctaLink ? { text: doc.ctaText, link: doc.ctaLink } : undefined
        }));
      })
    );
  }
}