import { Component, OnInit, inject } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { SectionWrapper } from '../../../../shared/ui/section-wrapper/section-wrapper';
import { AboutService }   from '../../services/about.service';

@Component({
  selector: 'app-mission-vision-section',
  standalone: true,
  imports: [SectionWrapper, LucideAngularModule],
  templateUrl: './mission-vision-section.html',
  styleUrl:    './mission-vision-section.scss',
})
export class MissionVisionSection implements OnInit {
  private svc = inject(AboutService);
  cfg = this.svc.settings;

  ngOnInit(): void { this.svc.load().subscribe(); }
}
