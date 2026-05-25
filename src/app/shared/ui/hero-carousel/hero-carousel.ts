import { Component, Input, CUSTOM_ELEMENTS_SCHEMA, ViewChild, ElementRef, AfterViewInit , PLATFORM_ID,Inject} from '@angular/core';
import { CommonModule ,isPlatformBrowser} from '@angular/common';
import { RouterLink } from '@angular/router';

import { HeroSlide } from '../../../core/hero-slide.interface';
// 1. IMPORTAR DESDE EL BUNDLE (Incluye todo: Fade, Autoplay, etc.)
import { register } from 'swiper/element/bundle';

// 2. REGISTRAR SWIPER
register();

@Component({
  selector: 'qrl-hero-carousel',
  standalone: true,
  imports: [CommonModule, RouterLink], // YA NO importamos SwiperModule
  templateUrl: './hero-carousel.html',
  styleUrls: ['./hero-carousel.scss'],
  // 3. PERMITIR ETIQUETAS PERSONALIZADAS
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class HeroCarouselComponent implements AfterViewInit {
  @Input() slides: HeroSlide[] = [];
  
  // 4. REFERENCIA AL ELEMENTO DEL DOM
  @ViewChild('swiper') swiperRef!: ElementRef;
  // Inyectamos el identificador de plataforma
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  // 5. CONFIGURACIÓN (Ahora se pasa como objeto directo al elemento)
  swiperParams = {
    slidesPerView: 1,
    loop: true,
    //effect: 'fade', // Efecto premium
    speed: 1000,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      clickable: true,
    },
    injectStyles: [`
      .swiper-pagination-bullet {
        background: white !important;
        opacity: 0.4;
        width: 10px;
        height: 10px;
        transition: all 0.3s;
      }
      .swiper-pagination-bullet-active {
        opacity: 1;
        background: #2EC643 !important; /* Tu verde Qrealab */
        width: 24px;
        border-radius: 10px;
      }
    `]
  };

  // 6. INICIALIZAR MANUALMENTE
 ngAfterViewInit(): void {
    // EL ARREGLO: Solo inicializar si estamos en el NAVEGADOR
    if (isPlatformBrowser(this.platformId)) {
      const swiperEl = this.swiperRef.nativeElement;
      Object.assign(swiperEl, this.swiperParams);
      swiperEl.initialize();
    }
  }
}
