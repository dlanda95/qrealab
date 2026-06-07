import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Lang, UI } from './translations';

const STORAGE_KEY = 'qrl_lang';

@Injectable({ providedIn: 'root' })
export class LanguageService {

  private platformId = inject(PLATFORM_ID);

  currentLang = signal<Lang>('es');

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.initFromBrowser();
    }
  }

  /** Switch language, persist preference, reload page */
  setLanguage(lang: Lang): void {
    if (!isPlatformBrowser(this.platformId)) return;
    localStorage.setItem(STORAGE_KEY, lang);
    window.location.reload();
  }

  /** Translate a static UI key */
  t(key: string): string {
    const lang = this.currentLang();
    return UI[lang]?.[key] ?? UI['es']?.[key] ?? key;
  }

  private initFromBrowser(): void {
    const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (stored === 'es' || stored === 'en') {
      this.currentLang.set(stored);
      return;
    }
    // Auto-detect from browser
    const browserLang = (navigator.language ?? 'es').toLowerCase();
    this.currentLang.set(browserLang.startsWith('es') ? 'es' : 'en');
  }
}
