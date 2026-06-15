import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

import { Navbar }        from './shared/layouts/navbar/navbar';
import { Footer }        from './shared/layouts/footer/footer';
import { ContactModal }  from './features/contact/ui/contact-modal/contact-modal';
import { ContactModalService } from './features/contact/services/contact-modal.service';

const PRELOADER_MIN_MS = 2500;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, ContactModal],
  templateUrl: './app.html',
})
export class App implements OnInit {
  private platformId = inject(PLATFORM_ID);
  readonly modal = inject(ContactModalService);

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    // Dynamic imports: GSAP and AOS load in parallel as separate chunks,
    // not blocking the main bundle parse.
    Promise.all([
      import('gsap').then(m => m.gsap),
      import('aos'),
    ]).then(([gsap, AosModule]) => {
      AosModule.default.init({
        duration: 650,
        once: true,
        offset: 80,
        easing: 'ease-out-quart',
        delay: 0,
        anchorPlacement: 'top-bottom',
      });
      this.runCurtainReveal(gsap);
    });
  }

  private runCurtainReveal(gsap: any): void {
    const preloader = document.getElementById('qrl-preloader');
    if (!preloader) return;

    gsap.set('app-root', { scale: 1.04, y: 10 });

    const elapsed = Date.now() - ((window as any).__qrlPreloaderStart ?? Date.now());
    const wait    = Math.max(0, PRELOADER_MIN_MS - elapsed);

    setTimeout(() => {
      const cLeft  = document.getElementById('qrl-c-left');
      const cRight = document.getElementById('qrl-c-right');
      const center = preloader.querySelector<HTMLElement>('.qrl-pre-center');

      if (!cLeft || !cRight) { preloader.remove(); return; }

      const tl = gsap.timeline({ onComplete: () => preloader.remove() });

      if (center) {
        tl.to(center, { opacity: 0, scale: 0.88, duration: 0.32, ease: 'power2.in' });
      }

      tl.to(cLeft,  { x: '-100%', duration: 0.72, ease: 'power3.inOut' }, '-=0.1')
        .to(cRight, { x:  '100%', duration: 0.72, ease: 'power3.inOut' }, '<0.06');

      tl.to('app-root', { scale: 1, y: 0, duration: 0.72, ease: 'power3.out' }, '<');
    }, wait);
  }
}
