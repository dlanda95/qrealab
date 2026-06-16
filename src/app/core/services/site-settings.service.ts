import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, shareReplay, tap, map, catchError } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface SiteSettings {
  mostrarBtnContacto: boolean;
}

const DEFAULT_SITE_SETTINGS: SiteSettings = {
  mostrarBtnContacto: true,
};

@Injectable({ providedIn: 'root' })
export class SiteSettingsService {
  private http = inject(HttpClient);
  private base = environment.apiUrl;

  settings = signal<SiteSettings>(DEFAULT_SITE_SETTINGS);

  private loaded  = false;
  private shared$: Observable<SiteSettings> | null = null;

  load(): Observable<SiteSettings> {
    if (this.loaded) return of(this.settings());

    if (!this.shared$) {
      this.shared$ = this.http
        .get<any>(`${this.base}/api/globals/site-settings?depth=0`)
        .pipe(
          map(data => ({
            mostrarBtnContacto: data.mostrarBtnContacto ?? true,
          })),
          tap(s => { this.settings.set(s); this.loaded = true; }),
          catchError(() => of(this.settings())),
          shareReplay(1),
        );
    }
    return this.shared$;
  }
}
