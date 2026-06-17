import { Component } from '@angular/core';

import { AboutHeroSection }       from './sections/about-hero-section/about-hero-section';
import { MissionVisionSection }   from './sections/mission-vision-section/mission-vision-section';
import { TeamSection }            from './sections/team-section/team-section';
import { TeamNarrativeSection }   from './sections/team-narrative-section/team-narrative-section';
import { AlliesSection }          from './sections/allies-section/allies-section';

@Component({
  selector: 'app-about',
  imports: [AboutHeroSection, MissionVisionSection, TeamSection, TeamNarrativeSection, AlliesSection],
  templateUrl: './about.html',
  styleUrl:    './about.scss',
})
export class About {}
