import { Component, OnInit, inject } from '@angular/core';
import { AboutService } from '../../services/about.service';
import { HeroSection } from '../../../../shared/ui/hero-section/hero-section';

@Component({
  selector: 'app-about-hero-section',
  imports: [HeroSection],
  templateUrl: './about-hero-section.html',
  styleUrl:    './about-hero-section.scss',
})
export class AboutHeroSection implements OnInit {
  private svc = inject(AboutService);
  cfg = this.svc.settings;

  ngOnInit(): void { this.svc.load().subscribe(); }
}
