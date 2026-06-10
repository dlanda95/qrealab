import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import * as AOS from 'aos';

import { Navbar }        from './shared/layouts/navbar/navbar';
import { Footer }        from './shared/layouts/footer/footer';
import { ContactModal }  from './features/contact/ui/contact-modal/contact-modal';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, ContactModal],
  templateUrl: './app.html',
})
export class App implements OnInit {
  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init({ duration: 800, once: true, offset: 100, easing: 'ease-out-cubic' });
      (window as any).__qrlHidePreloader?.();
    }
  }
}
