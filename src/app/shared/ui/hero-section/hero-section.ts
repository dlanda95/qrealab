import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [],
  templateUrl: './hero-section.html',
  styleUrl:    './hero-section.scss',
})
export class HeroSection {
  @Input() eyebrow?:     string;
  @Input() title:        string = '';
  @Input() subtitle?:    string;
  @Input() description?: string;
}
