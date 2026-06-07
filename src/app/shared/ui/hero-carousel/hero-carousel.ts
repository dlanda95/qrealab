import { Component, Input, CUSTOM_ELEMENTS_SCHEMA, ViewChild, ElementRef, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

import { HeroSlide } from '../../models/hero-slide.interface';
// 1. IMPORTAR DESDE EL BUNDLE (Incluye todo: Fade, Autoplay, etc.)
import { register } from 'swiper/element/bundle';

// 2. REGISTRAR SWIPER
register();

@Component({
  selector: 'qrl-hero-carousel',
  standalone: true,
  imports: [RouterLink], // @for/@if son built-in en Angular 17+, no necesitan CommonModule
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
    // Fade crossfade: los slides se disuelven uno en otro (no se deslizan)
    effect: 'fade',
    fadeEffect: { crossFade: true },
    speed: 1400,
    autoplay: {
      delay: 5500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    pagination: {
      clickable: true,
    },
    navigation: true,   // Flechas izq / der

    // Estilos inyectados en el shadow DOM de Swiper
    // (aquí sí aplican media queries y cualquier CSS estándar)
    injectStyles: [`

      /* ── Paginación (dots) ───────────────────────────────────
         Posicionados en la zona translúcida de las olas (entre
         ola 10% y ola 22%), visibles contra la imagen y con
         las olas de fondo como contexto visual.                */
      .swiper-pagination {
        bottom: 148px !important;
        z-index: 20;
      }
      .swiper-pagination-bullet {
        background: rgba(255, 255, 255, 0.42) !important;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        transition: all 0.35s cubic-bezier(0.2, 0, 0, 1);
        opacity: 1 !important;
      }
      .swiper-pagination-bullet-active {
        background: #2EC643 !important;
        width: 28px;
        border-radius: 8px;
      }

      /* ── Flechas de navegación ───────────────────────────────
         top: 38% centra las flechas en el área de contenido
         visual (hero height - 200px olas) / 2 ≈ 38% del total.*/
      .swiper-button-prev,
      .swiper-button-next {
        top: 38%;
        width: 48px;
        height: 48px;
        margin-top: -24px;
        background: rgba(255, 255, 255, 0.12);
        border: 1px solid rgba(255, 255, 255, 0.28);
        border-radius: 50%;
        color: #ffffff;
        transition: background 0.28s ease,
                    border-color 0.28s ease,
                    transform 0.28s ease;
      }
      .swiper-button-prev:hover,
      .swiper-button-next:hover {
        background: rgba(255, 255, 255, 0.22);
        border-color: rgba(46, 198, 67, 0.65);
        transform: scale(1.10);
      }
      .swiper-button-prev { left: 28px; }
      .swiper-button-next { right: 28px; }
      .swiper-button-prev::after,
      .swiper-button-next::after {
        font-size: 15px !important;
        font-weight: 800;
        color: #ffffff;
      }
      .swiper-button-disabled {
        opacity: 0.25 !important;
        pointer-events: none;
      }

      /* ── Tablet (≤ 768px) ───────────────────────────────── */
      @media (max-width: 768px) {
        .swiper-pagination { bottom: 112px !important; }
        .swiper-button-prev,
        .swiper-button-next {
          top: 38%;
          width: 40px;
          height: 40px;
          margin-top: -20px;
        }
        .swiper-button-prev { left: 14px; }
        .swiper-button-next { right: 14px; }
        .swiper-button-prev::after,
        .swiper-button-next::after { font-size: 13px !important; }
      }

      /* ── Móvil (≤ 576px) ────────────────────────────────── */
      @media (max-width: 576px) {
        .swiper-pagination { bottom: 82px !important; }
        /* Flechas ocultas en móvil — el swipe táctil es suficiente */
        .swiper-button-prev,
        .swiper-button-next { display: none; }
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
