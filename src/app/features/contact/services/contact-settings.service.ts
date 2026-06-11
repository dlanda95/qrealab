import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap, catchError } from 'rxjs';

import { environment }                             from '../../../../environments/environment';
import { LanguageService }                         from '../../../core/i18n/language.service';
import { ContactSettings, DEFAULT_CONTACT_SETTINGS } from '../models/contact.interface';

@Injectable({ providedIn: 'root' })
export class ContactSettingsService {
  private http = inject(HttpClient);
  private lang = inject(LanguageService);
  private base = environment.apiUrl;

  /** Configuración activa — parte de DEFAULT hasta que la API responda. */
  settings = signal<ContactSettings>(DEFAULT_CONTACT_SETTINGS);
  loading  = signal(false);
  loaded   = signal(false);

  load(): Observable<ContactSettings> {
    if (this.loaded()) return of(this.settings());

    const locale = this.lang.currentLang();
    this.loading.set(true);

    return this.http
      .get<ContactSettings>(
        `${this.base}/api/globals/contact-settings?locale=${locale}&depth=1`,
      )
      .pipe(
        tap(data => {
          this.settings.set({ ...DEFAULT_CONTACT_SETTINGS, ...data });
          this.loading.set(false);
          this.loaded.set(true);
        }),
        catchError(() => {
          // Ante cualquier error de red usa los defaults — el modal sigue funcionando.
          this.loading.set(false);
          this.loaded.set(true);
          return of(this.settings());
        }),
      );
  }
}
