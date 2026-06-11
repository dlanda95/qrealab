import { Component, OnInit, inject, signal } from '@angular/core';

import { HeroCarousel } from '../../shared/ui/hero-carousel/hero-carousel';
import { SectionWrapper }        from '../../shared/ui/section-wrapper/section-wrapper';
import { InfoCarousel }          from '../../shared/ui/info-carousel/info-carousel';
import { VigilanceService }      from './services/vigilance.service';
import { LanguageService }       from '../../core/i18n/language.service';
import { HeroSlide }             from '../../shared/models/hero-slide.interface';
import { InfoBlock }             from './models/vigilance.interface';

@Component({
  selector: 'app-vigilance',
  imports: [HeroCarousel, SectionWrapper, InfoCarousel],
  templateUrl: './vigilance.html',
  styleUrl: './vigilance.scss',
})
export class Vigilance implements OnInit {
  private svc = inject(VigilanceService);
  lang        = inject(LanguageService);

  heroSlides = signal<HeroSlide[]>([]);
  infoBlocks = signal<InfoBlock[]>([]);

  ngOnInit(): void {
    this.svc.getVigilance().subscribe({
      next: data => {
        this.heroSlides.set(this.svc.toHeroSlides(data));
        this.infoBlocks.set(data.infoBlocks);
      },
      error: err => console.error('Error cargando vigilancia:', err),
    });
  }
}
