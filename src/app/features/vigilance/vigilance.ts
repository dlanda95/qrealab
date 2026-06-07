import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';

import { HeroCarouselComponent } from '../../shared/ui/hero-carousel/hero-carousel';
import { SectionWrapper }        from '../../shared/ui/section-wrapper/section-wrapper';
import { InfoCarousel }          from '../../shared/ui/info-carousel/info-carousel';

import { VigilanceService }  from '../../core/vigilance.service';
import { HeroSlide }         from '../../core/hero-slide.interface';
import { InfoBlock }         from '../../core/vigilance.interface';
import { LanguageService }   from '../../core/language.service';

@Component({
  selector: 'app-vigilance',
  imports: [HeroCarouselComponent, SectionWrapper, InfoCarousel],
  templateUrl: './vigilance.html',
  styleUrl: './vigilance.scss',
})
export class Vigilance implements OnInit {

  private svc = inject(VigilanceService);
  private cdr = inject(ChangeDetectorRef);
  lang = inject(LanguageService);

  heroSlides: HeroSlide[] = [];
  infoBlocks: InfoBlock[] = [];

  ngOnInit(): void {
    this.svc.getVigilance().subscribe({
      next: data => {
        this.heroSlides = this.svc.toHeroSlides(data);
        this.infoBlocks = data.infoBlocks;
        this.cdr.markForCheck();
      },
      error: err => console.error('Error cargando vigilancia:', err),
    });
  }
}
