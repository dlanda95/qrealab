import { Component, OnInit, inject, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { HeroSection }         from '../../shared/ui/hero-section/hero-section';
import { SectionWrapper }      from '../../shared/ui/section-wrapper/section-wrapper';
import { InfoCarousel }        from '../../shared/ui/info-carousel/info-carousel';
import { PharmavigilanceForm } from './pharmavig-form/pharmavig-form';
import { VigilanceService }    from './services/vigilance.service';
import { LanguageService }     from '../../core/i18n/language.service';
import { InfoBlock }           from './models/vigilance.interface';

@Component({
  selector: 'app-vigilance',
  imports: [HeroSection, SectionWrapper, InfoCarousel, PharmavigilanceForm],
  templateUrl: './vigilance.html',
  styleUrl: './vigilance.scss',
})
export class Vigilance implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private svc        = inject(VigilanceService);
  private lang       = inject(LanguageService);

  heroEyebrow   = signal('');
  heroTitulo    = signal('');
  heroSubtitulo = signal('');
  infoEyebrow   = signal('');
  infoTitulo    = signal('');
  infoBlocks    = signal<InfoBlock[]>([]);

  ngOnInit(): void {
    // Valores i18n inmediatos para que el hero nunca quede vacío
    this.heroEyebrow.set(this.lang.t('vigilance.heroEyebrow'));
    this.heroTitulo.set(this.lang.t('vigilance.heroTitle'));
    this.heroSubtitulo.set(this.lang.t('vigilance.heroSubtitle'));
    this.infoEyebrow.set(this.lang.t('vigilance.eyebrow'));
    this.infoTitulo.set(this.lang.t('vigilance.title'));

    if (!isPlatformBrowser(this.platformId)) return;

    this.svc.getVigilance().subscribe({
      next: data => {
        if (data.heroEyebrow)   this.heroEyebrow.set(data.heroEyebrow);
        if (data.heroTitulo)    this.heroTitulo.set(data.heroTitulo);
        if (data.heroSubtitulo) this.heroSubtitulo.set(data.heroSubtitulo);
        if (data.infoEyebrow)   this.infoEyebrow.set(data.infoEyebrow);
        if (data.infoTitulo)    this.infoTitulo.set(data.infoTitulo);
        this.infoBlocks.set(data.infoBlocks);
      },
      error: err => console.error('Error cargando vigilancia:', err),
    });
  }
}
