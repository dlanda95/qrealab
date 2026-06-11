import { Component, OnInit, inject } from '@angular/core';
import { SectionWrapper } from '../../../../shared/ui/section-wrapper/section-wrapper';
import { AboutService }   from '../../services/about.service';

@Component({
  selector: 'app-allies-section',
  imports: [SectionWrapper],
  templateUrl: './allies-section.html',
  styleUrl:    './allies-section.scss',
})
export class AlliesSection implements OnInit {
  private svc = inject(AboutService);
  cfg = this.svc.settings;

  ngOnInit(): void { this.svc.load().subscribe(); }

  openAlly(url: string): void {
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  }
}
