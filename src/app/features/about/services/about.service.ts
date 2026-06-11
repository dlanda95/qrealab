import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, shareReplay, tap, map, catchError } from 'rxjs';

import { LanguageService } from '../../../core/i18n/language.service';
import { environment }     from '../../../../environments/environment';
import { AboutSettings, DEFAULT_ABOUT_SETTINGS } from '../models/about.interface';

@Injectable({ providedIn: 'root' })
export class AboutService {
  private http = inject(HttpClient);
  private lang = inject(LanguageService);
  private base = environment.apiUrl;

  settings = signal<AboutSettings>(DEFAULT_ABOUT_SETTINGS);

  private loaded  = false;
  private shared$: Observable<AboutSettings> | null = null;

  load(): Observable<AboutSettings> {
    if (this.loaded) return of(this.settings());

    if (!this.shared$) {
      const locale = this.lang.currentLang();
      this.shared$ = this.http
        .get<any>(`${this.base}/api/globals/about-settings?locale=${locale}&depth=2`)
        .pipe(
          map(data => this.mapResponse(data)),
          tap(s => { this.settings.set(s); this.loaded = true; }),
          catchError(() => of(this.settings())),
          shareReplay(1),
        );
    }
    return this.shared$;
  }

  private mapResponse(data: any): AboutSettings {
    return {
      ...DEFAULT_ABOUT_SETTINGS,
      ...data,
      heroImagen: data.heroImagen?.url ?? undefined,
      heroStats: data.heroStats?.length ? data.heroStats : DEFAULT_ABOUT_SETTINGS.heroStats,
      equipoGrupos: (data.equipoGrupos ?? []).map((g: any) => ({
        ...g,
        miembros: (g.miembros ?? []).map((m: any) => ({
          ...m,
          foto: m.foto?.url ?? undefined,
        })),
      })),
      aliados: (data.aliados ?? []).map((a: any) => ({
        ...a,
        logo: a.logo?.url ?? undefined,
      })),
    };
  }
}
