import { Component } from '@angular/core';

import { HeroSection }      from './sections/hero-section/hero-section';
import { HistorySection }   from './sections/history-section/history-section';
import { WhoweareSection }  from './sections/whoweare-section/whoweare-section';
import { OurValuesSection } from './sections/our-values-section/our-values-section';

@Component({
  selector: 'app-home',
  imports: [HeroSection, HistorySection, WhoweareSection, OurValuesSection],
  templateUrl: './home.html',
})
export class Home {}
