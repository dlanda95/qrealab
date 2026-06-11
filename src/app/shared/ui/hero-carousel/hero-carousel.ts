import { Component, Input, CUSTOM_ELEMENTS_SCHEMA, ViewChild, ElementRef, AfterViewInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { register } from 'swiper/element/bundle';
import { HeroSlide } from '../../models/hero-slide.interface';

register();

@Component({
  selector: 'qrl-hero-carousel',
  imports: [RouterLink],
  templateUrl: './hero-carousel.html',
  styleUrl: './hero-carousel.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HeroCarousel implements AfterViewInit {
  @Input() slides: HeroSlide[] = [];
  @ViewChild('swiper') swiperRef!: ElementRef;

  private platformId = inject(PLATFORM_ID);

  swiperParams = {
    slidesPerView: 1,
    loop: true,
    effect: 'fade',
    fadeEffect: { crossFade: true },
    speed: 1400,
    autoplay: {
      delay: 5500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    pagination: { clickable: true },
    navigation: true,
    // Swiper Web Component requiere inyectar estilos en su shadow DOM
    injectStyles: [`
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
        transition: background 0.28s ease, border-color 0.28s ease, transform 0.28s ease;
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
      @media (max-width: 768px) {
        .swiper-pagination { bottom: 112px !important; }
        .swiper-button-prev,
        .swiper-button-next { top: 38%; width: 40px; height: 40px; margin-top: -20px; }
        .swiper-button-prev { left: 14px; }
        .swiper-button-next { right: 14px; }
        .swiper-button-prev::after,
        .swiper-button-next::after { font-size: 13px !important; }
      }
      @media (max-width: 576px) {
        .swiper-pagination { bottom: 82px !important; }
        .swiper-button-prev,
        .swiper-button-next { display: none; }
      }
    `],
  };

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const swiperEl = this.swiperRef.nativeElement;
      Object.assign(swiperEl, this.swiperParams);
      swiperEl.initialize();
    }
  }
}
