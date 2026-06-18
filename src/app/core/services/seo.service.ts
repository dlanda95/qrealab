import { Injectable, inject } from '@angular/core';
import { Title, Meta }       from '@angular/platform-browser';
import { DOCUMENT }          from '@angular/common';

export interface SeoConfig {
  title:        string;
  description:  string;
  path?:        string;   // e.g. '/products/qreamox'
  image?:       string;   // URL absoluta de imagen OG (1200×630 recomendado)
  noindex?:     boolean;
}

const BASE_URL = 'https://qrealab.com';
const BRAND    = 'Qrealab';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private titleSvc = inject(Title);
  private meta     = inject(Meta);
  private doc      = inject(DOCUMENT);

  set(cfg: SeoConfig): void {
    const fullTitle    = cfg.title.includes(BRAND) ? cfg.title : `${cfg.title} | ${BRAND}`;
    const canonicalUrl = `${BASE_URL}${cfg.path ?? '/'}`;

    this.titleSvc.setTitle(fullTitle);

    this.meta.updateTag({ name: 'description',   content: cfg.description });
    this.meta.updateTag({ name: 'robots',        content: cfg.noindex ? 'noindex,nofollow' : 'index,follow' });

    this.meta.updateTag({ property: 'og:title',       content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: cfg.description });
    this.meta.updateTag({ property: 'og:url',         content: canonicalUrl });

    if (cfg.image) {
      this.meta.updateTag({ property: 'og:image',      content: cfg.image });
      this.meta.updateTag({ name:     'twitter:image', content: cfg.image });
    }

    this.meta.updateTag({ name: 'twitter:title',       content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: cfg.description });

    this.setCanonical(canonicalUrl);
  }

  private setCanonical(url: string): void {
    let link = this.doc.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
