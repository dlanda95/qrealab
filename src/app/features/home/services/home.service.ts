import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, shareReplay, tap, map, catchError } from 'rxjs';

import { LanguageService }                          from '../../../core/i18n/language.service';
import { environment }                              from '../../../../environments/environment';
import { HomeSettings, DEFAULT_HOME_SETTINGS }      from '../models/home.interface';

@Injectable({ providedIn: 'root' })
export class HomeService {
  private http = inject(HttpClient);
  private lang = inject(LanguageService);
  private base = environment.apiUrl;

  settings = signal<HomeSettings>(DEFAULT_HOME_SETTINGS);

  private loaded  = signal(false);
  private shared$: Observable<HomeSettings> | null = null;

  load(): Observable<HomeSettings> {
    if (this.loaded()) return of(this.settings());

    if (!this.shared$) {
      const locale = this.lang.currentLang();
      this.shared$ = this.http
        .get<any>(`${this.base}/api/globals/home-settings?locale=${locale}&depth=2`)
        .pipe(
          map(data => this.mapResponse(data)),
          tap(s => { this.settings.set(s); this.loaded.set(true); }),
          catchError(() => of(this.settings())),
          shareReplay(1),
        );
    }
    return this.shared$;
  }

  private mapResponse(data: any): HomeSettings {
    const base = this.base;

    const heroSlides = (data.heroSlides ?? []).map((s: any) => ({
      id:       s.id,
      tag:      s.tag,
      title:    s.title,
      subtitle: s.subtitle,
      image:    s.image?.url?.startsWith('http') ? s.image.url : `${base}${s.image?.url ?? ''}`,
      cta:      s.ctaText && s.ctaLink ? { text: s.ctaText, link: s.ctaLink } : undefined,
    }));

    return {
      heroSlides,
      histTitle:       data.histTitle       ?? DEFAULT_HOME_SETTINGS.histTitle,
      histDescription: data.histDescription ?? DEFAULT_HOME_SETTINGS.histDescription,
      histImage:       data.histImage?.url  ?? undefined,
      whoTitle:        data.whoTitle        ?? DEFAULT_HOME_SETTINGS.whoTitle,
      whoDescription:  data.whoDescription  ?? DEFAULT_HOME_SETTINGS.whoDescription,
      whoImage:        data.whoImage?.url   ?? undefined,
      valSectionTitle: data.valSectionTitle ?? DEFAULT_HOME_SETTINGS.valSectionTitle,
      valImage:        data.valImage?.url   ?? undefined,
      values: (data.values ?? []).map((v: any) => ({
        id:     v.id,
        icon:   v.icon,
        title:  v.title,
        points: (v.points ?? []).map((p: any) => ({
          label:       p.label,
          description: p.description,
        })),
      })),
    };
  }
}
