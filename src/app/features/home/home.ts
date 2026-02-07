import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionWrapper } from '../../shared/ui/section-wrapper/section-wrapper';
import { SplitSection } from '../../shared/ui/split-section/split-section';
import { HOME_CONTENT } from '../../data/home-content.data'; // Importamos los datos

import { Hero } from './components/hero/hero';
@Component({
  selector: 'app-home',
  imports: [CommonModule, SectionWrapper, SplitSection,Hero],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {


  content = HOME_CONTENT;

}
