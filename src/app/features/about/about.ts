import { Component, OnInit, inject } from '@angular/core';

import { AboutHeroSection }       from './sections/about-hero-section/about-hero-section';
import { MissionVisionSection }   from './sections/mission-vision-section/mission-vision-section';
import { TeamSection }            from './sections/team-section/team-section';
import { TeamNarrativeSection }   from './sections/team-narrative-section/team-narrative-section';
import { AlliesSection }          from './sections/allies-section/allies-section';
import { SeoService }             from '../../core/services/seo.service';

@Component({
  selector: 'app-about',
  imports: [AboutHeroSection, MissionVisionSection, TeamSection, TeamNarrativeSection, AlliesSection],
  templateUrl: './about.html',
  styleUrl:    './about.scss',
})
export class About implements OnInit {
  private seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.set({
      title:       'Nosotros | Qrealab',
      description: 'Conoce la historia, misión y el equipo de Qrealab. Más de 25 años de experiencia en la industria farmacéutica peruana.',
      path:        '/about',
    });
  }
}
