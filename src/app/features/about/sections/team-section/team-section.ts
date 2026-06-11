import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { SectionWrapper } from '../../../../shared/ui/section-wrapper/section-wrapper';
import { PersonCard }     from '../../../../shared/ui/person-card/person-card';
import { AboutService }   from '../../services/about.service';

@Component({
  selector: 'app-team-section',
  imports: [SectionWrapper, PersonCard],
  templateUrl: './team-section.html',
  styleUrl:    './team-section.scss',
})
export class TeamSection implements OnInit {
  private svc = inject(AboutService);
  cfg = this.svc.settings;

  activeGroupIdx = signal(0);

  activeGroup = computed(() => {
    const groups = this.cfg().equipoGrupos;
    return groups[this.activeGroupIdx()] ?? groups[0] ?? null;
  });

  ngOnInit(): void { this.svc.load().subscribe(); }

  selectGroup(idx: number): void { this.activeGroupIdx.set(idx); }
}
