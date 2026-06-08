import { Component, OnInit, signal, inject } from '@angular/core';

import { SectionWrapper } from '../../../../shared/ui/section-wrapper/section-wrapper';
import { SplitSection }   from '../../../../shared/ui/split-section/split-section';
import { HomeService }    from '../../services/home.service';

interface SectionData { title: string; description: string[]; image: string; }

@Component({
  selector: 'app-history-section',
  standalone: true,
  imports: [SectionWrapper, SplitSection],
  templateUrl: './history-section.html',
})
export class HistorySection implements OnInit {
  private homeSvc = inject(HomeService);

  data = signal<SectionData | null>(null);

  ngOnInit(): void {
    this.homeSvc.load().subscribe(s => this.data.set({
      title:       s.histTitle,
      description: s.histDescription.split('\n').filter(l => l.trim()),
      image:       s.histImage ?? '',
    }));
  }
}
