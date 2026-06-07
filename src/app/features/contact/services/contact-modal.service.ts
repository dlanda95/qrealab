import { Injectable, inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ContactModalService {
  private platformId = inject(PLATFORM_ID);

  isOpen = signal(false);

  open(): void {
    this.isOpen.set(true);
    if (isPlatformBrowser(this.platformId)) document.body.style.overflow = 'hidden';
  }

  close(): void {
    this.isOpen.set(false);
    if (isPlatformBrowser(this.platformId)) document.body.style.overflow = '';
  }

  toggle(): void {
    this.isOpen() ? this.close() : this.open();
  }
}
