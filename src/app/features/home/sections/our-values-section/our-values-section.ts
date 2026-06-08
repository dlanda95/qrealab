import { Component, OnInit, signal, inject } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

import { SectionWrapper }  from '../../../../shared/ui/section-wrapper/section-wrapper';
import { LeafFrame }       from '../../../../shared/ui/leaf-frame/leaf-frame';
import { HomeService }     from '../../services/home.service';
import { OurValuesSection as OurValuesSectionData } from '../../models/our-values.interface';

@Component({
  selector: 'app-our-values-section',
  standalone: true,
  imports: [SectionWrapper, LucideAngularModule, LeafFrame],
  templateUrl: './our-values-section.html',
  styleUrl:    './our-values-section.scss',
})
export class OurValuesSection implements OnInit {
  private homeSvc = inject(HomeService);

  section = signal<OurValuesSectionData | null>(null);

  ngOnInit(): void {
    this.homeSvc.load().subscribe(s => this.section.set({
      sectionTitle: s.valSectionTitle,
      image:        s.valImage,
      values:       s.values,
    }));
  }
}
