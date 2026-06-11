import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, shareReplay, tap, map, catchError } from 'rxjs';

import { LanguageService }                      from '../i18n/language.service';
import { environment }                          from '../../../environments/environment';
import { NavSettings, DEFAULT_NAV_SETTINGS }    from './nav.interface';

@Injectable({ providedIn: 'root' })
export class NavService {
  private http = inject(HttpClient);
  private lang = inject(LanguageService);
  private base = environment.apiUrl;

  settings = signal<NavSettings>(DEFAULT_NAV_SETTINGS);

  private loaded  = false;
  private shared$: Observable<NavSettings> | null = null;

  load(): Observable<NavSettings> {
    if (this.loaded) return of(this.settings());

    if (!this.shared$) {
      const locale = this.lang.currentLang();
      this.shared$ = this.http
        .get<any>(`${this.base}/api/globals/nav-settings?locale=${locale}&depth=0`)
        .pipe(
          map(data => this.mapResponse(data)),
          tap(s => { this.settings.set(s); this.loaded = true; }),
          catchError(() => of(this.settings())),
          shareReplay(1),
        );
    }
    return this.shared$;
  }

  private mapResponse(data: any): NavSettings {
    const items = Array.isArray(data.items)
      ? data.items.filter((i: any) => i.activo !== false)
      : DEFAULT_NAV_SETTINGS.items;

    return {
      items,
      ctaLabel: data.ctaLabel ?? DEFAULT_NAV_SETTINGS.ctaLabel,
    };
  }
}
