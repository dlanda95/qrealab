import { Component, OnInit, signal, inject } from '@angular/core';

import { SectionWrapper } from '../../../../shared/ui/section-wrapper/section-wrapper';
import { SplitSection }   from '../../../../shared/ui/split-section/split-section';
import { HomeService }    from '../../services/home.service';

interface SectionData { title: string; description: string[]; image: string; }

@Component({
  selector: 'app-whoweare-section',
  imports: [SectionWrapper, SplitSection],
  templateUrl: './whoweare-section.html',
})
export class WhoweareSection implements OnInit {
  private homeSvc = inject(HomeService);

  data = signal<SectionData | null>(null);

  ngOnInit(): void {
    this.homeSvc.load().subscribe(s => this.data.set({
      title:       s.whoTitle,
      description: s.whoDescription.split('\n').filter(l => l.trim()),
      image:       s.whoImage ?? '',
    }));
  }
}
