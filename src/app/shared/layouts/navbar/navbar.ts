import { Component, inject, signal, PLATFORM_ID, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { LanguageService }      from '../../../core/i18n/language.service';
import { ContactModalService }  from '../../../features/contact/services/contact-modal.service';
import { NavService }           from '../../../core/nav/nav.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, RouterLinkActive, LucideAngularModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit, OnDestroy {
  lang  = inject(LanguageService);
  modal = inject(ContactModalService);
  nav   = inject(NavService);
  private pid = inject(PLATFORM_ID);

  isScrolled       = signal(false);
  isMobileMenuOpen = signal(false);

  private readonly onScroll = () => this.isScrolled.set(window.scrollY > 20);

  ngOnInit(): void {
    this.nav.load().subscribe();
    if (isPlatformBrowser(this.pid)) {
      window.addEventListener('scroll', this.onScroll, { passive: true });
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.pid)) {
      window.removeEventListener('scroll', this.onScroll);
    }
  }

  toggleMobileMenu(): void {
    const next = !this.isMobileMenuOpen();
    this.isMobileMenuOpen.set(next);
    if (isPlatformBrowser(this.pid)) {
      document.body.style.overflow = next ? 'hidden' : '';
    }
  }
}
