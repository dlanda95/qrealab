import { Component, Input, signal } from '@angular/core';
import { InfoBlock } from '../../../core/vigilance.interface';

@Component({
  selector: 'app-info-carousel',
  imports: [],
  templateUrl: './info-carousel.html',
  styleUrl: './info-carousel.scss',
})
export class InfoCarousel {

  @Input() blocks:    InfoBlock[] = [];
  @Input() eyebrow?:  string;
  @Input() title?:    string;
  @Input() subtitle?: string;

  currentPage  = signal(0);
  fading       = signal(false);

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.blocks.length / 2));
  }

  get currentBlocks(): InfoBlock[] {
    const start = this.currentPage() * 2;
    return this.blocks.slice(start, start + 2);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }

  /** Índice global 1-based del bloque mostrado en posición `posInPage`. */
  globalIndex(posInPage: number): string {
    return String(this.currentPage() * 2 + posInPage + 1).padStart(2, '0');
  }

  navigate(dir: 'prev' | 'next'): void {
    const next = dir === 'prev' ? this.currentPage() - 1 : this.currentPage() + 1;
    if (next < 0 || next >= this.totalPages) return;
    this.changePage(next);
  }

  goToPage(index: number): void {
    if (index !== this.currentPage()) this.changePage(index);
  }

  private changePage(index: number): void {
    this.fading.set(true);
    setTimeout(() => {
      this.currentPage.set(index);
      this.fading.set(false);
    }, 220);
  }
}
