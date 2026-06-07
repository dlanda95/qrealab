import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterService } from '../../../core/footer.service';
import { FooterData } from '../../../core/footer.interface';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer implements OnInit {

  private footerService = inject(FooterService);
  private cdr           = inject(ChangeDetectorRef);
  footerData?: FooterData;

  ngOnInit(): void {
    this.footerService.getFooter().subscribe({
      next:  data  => { this.footerData = data; this.cdr.markForCheck(); },
      error: err   => console.error('Footer CMS error:', err),
    });
  }

  /** Determina si la url es interna (ruta Angular) o externa (http…) */
  isExternal(url: string): boolean {
    return url.startsWith('http://') || url.startsWith('https://');
  }
}
