import { Component, OnInit, signal, inject } from '@angular/core';

import { HeroCarousel } from '../../../../shared/ui/hero-carousel/hero-carousel';
import { HomeService }           from '../../services/home.service';
import { HeroSlide }             from '../../../../shared/models/hero-slide.interface';

@Component({
  selector: 'app-home-hero',
  imports: [HeroCarousel],
  templateUrl: './hero-section.html',
})
export class HeroSection implements OnInit {
  private homeSvc = inject(HomeService);

  slides = signal<HeroSlide[]>([]);

  ngOnInit(): void {
    this.homeSvc.load().subscribe(s => this.slides.set(s.heroSlides));
  }
}
