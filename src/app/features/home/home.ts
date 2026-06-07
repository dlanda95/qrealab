import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { SectionWrapper } from '../../shared/ui/section-wrapper/section-wrapper';
import { SplitSection } from '../../shared/ui/split-section/split-section';
import { HeroCarouselComponent } from '../../shared/ui/hero-carousel/hero-carousel';
import { OurValues } from './components/our-values/our-values';

import { HeroService } from '../../core/hero.service';
import { HeroSlide } from '../../core/hero-slide.interface';
import { HistoryService } from '../../core/history.service';
import { WhoweareService } from '../../core/whoweare.service';
import { OurValuesService } from '../../core/our-values.service';
import { OurValuesSection } from '../../core/our-values.interface';

@Component({
  selector: 'app-home',
  imports: [SectionWrapper, SplitSection, HeroCarouselComponent, OurValues],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {

  heroSlides: HeroSlide[]      = [];
  storyData:  any;
  whoweareData: any;
  ourValuesData?: OurValuesSection;

  private cdr              = inject(ChangeDetectorRef);
  private heroService      = inject(HeroService);
  private historyService   = inject(HistoryService);
  private whoweareService  = inject(WhoweareService);
  private ourValuesService = inject(OurValuesService);

  ngOnInit(): void {

    this.heroService.getHeroSlides().subscribe({
      next:  (data) => { this.heroSlides = data;    this.cdr.markForCheck(); },
      error: (err)  => { console.error('Error cargando hero slides:', err); }
    });

    this.historyService.getHistory().subscribe({
      next:  (data) => { this.storyData = data;     this.cdr.markForCheck(); },
      error: (err)  => { console.error('Error cargando historia:', err); }
    });

    this.whoweareService.getWhoweare().subscribe({
      next:  (data) => { this.whoweareData = data;  this.cdr.markForCheck(); },
      error: (err)  => { console.error('Error cargando quiénes somos:', err); }
    });

    this.ourValuesService.getOurValues().subscribe({
      next:  (data) => { this.ourValuesData = data; this.cdr.markForCheck(); },
      error: (err)  => { console.error('Error cargando nuestros valores:', err); }
    });

  }
}
