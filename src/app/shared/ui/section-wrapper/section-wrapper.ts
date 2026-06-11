import { Component, Input, ElementRef, AfterViewInit, inject, PLATFORM_ID } from '@angular/core';
import { NgClass, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-section-wrapper',
  imports: [NgClass],
  templateUrl: './section-wrapper.html',
  styleUrl: './section-wrapper.scss',
})
export class SectionWrapper implements AfterViewInit {

  @Input() backgroundColor: 'white' | 'gray' | 'dark' = 'white';

  /** Color de la siguiente sección — genera una ola SVG de transición. */
  @Input() waveBottom: 'none' | 'to-gray' | 'to-white' | 'to-dark' = 'none';

  private el         = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);

  get hasWave(): boolean { return this.waveBottom !== 'none'; }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.el.nativeElement.classList.add('is-visible');
          observer.disconnect();
        }
      },
      { threshold: 0.06, rootMargin: '0px 0px -50px 0px' },
    );
    observer.observe(this.el.nativeElement);
  }
}
