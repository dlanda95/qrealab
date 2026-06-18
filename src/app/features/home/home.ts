import { Component, OnInit, inject } from '@angular/core';

import { HeroSection }      from './sections/hero-section/hero-section';
import { HistorySection }   from './sections/history-section/history-section';
import { WhoweareSection }  from './sections/whoweare-section/whoweare-section';
import { OurValuesSection } from './sections/our-values-section/our-values-section';
import { SeoService }       from '../../core/services/seo.service';

@Component({
  selector: 'app-home',
  imports: [HeroSection, HistorySection, WhoweareSection, OurValuesSection],
  templateUrl: './home.html',
})
export class Home implements OnInit {
  private seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.set({
      title:       'Qrealab | Laboratorio farmacéutico peruano',
      description: 'Qrealab S.A.C. ofrece soluciones farmacéuticas de alta calidad con más de 25 años de experiencia en el mercado peruano.',
      path:        '/',
    });
  }
}
