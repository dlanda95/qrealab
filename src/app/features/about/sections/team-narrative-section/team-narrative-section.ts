import { Component, OnInit, inject } from '@angular/core';
import { SectionWrapper } from '../../../../shared/ui/section-wrapper/section-wrapper';
import { AboutService }   from '../../services/about.service';

@Component({
  selector: 'app-team-narrative-section',
  imports: [SectionWrapper],
  templateUrl: './team-narrative-section.html',
  styleUrl:    './team-narrative-section.scss',
})
export class TeamNarrativeSection implements OnInit {
  private svc = inject(AboutService);
  cfg = this.svc.settings;

  ngOnInit(): void { this.svc.load().subscribe(); }
}
