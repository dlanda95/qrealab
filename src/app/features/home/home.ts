import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionWrapper } from '../../shared/ui/section-wrapper/section-wrapper';
import { SplitSection } from '../../shared/ui/split-section/split-section';
import { HOME_CONTENT } from '../../data/home-content.data'; // Importamos los datos

import { HeroCarouselComponent
 } from '../../shared/ui/hero-carousel/hero-carousel';


import { HERO_SLIDES } from '../../data/home-content.data';


@Component({
  selector: 'app-home',
  imports: [CommonModule, SectionWrapper, SplitSection,HeroCarouselComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
heroSlides = HERO_SLIDES; // Pasarlo a la vista

  content = HOME_CONTENT;

}
