import { Component, inject, OnInit, signal, DestroyRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FooterService } from './footer.service';
import { FooterData } from './footer.interface';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer implements OnInit {
  private footerService = inject(FooterService);
  private destroyRef    = inject(DestroyRef);

  footerData = signal<FooterData | null>(null);

  ngOnInit(): void {
    this.footerService.getFooter().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next:  data => this.footerData.set(data),
      error: err  => console.error('Footer CMS error:', err),
    });
  }

  isExternal(url: string): boolean {
    return url.startsWith('http://') || url.startsWith('https://');
  }
}
