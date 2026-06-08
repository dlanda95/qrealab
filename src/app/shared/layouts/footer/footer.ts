import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
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

  footerData = signal<FooterData | null>(null);

  ngOnInit(): void {
    this.footerService.getFooter().subscribe({
      next:  data => this.footerData.set(data),
      error: err  => console.error('Footer CMS error:', err),
    });
  }

  isExternal(url: string): boolean {
    return url.startsWith('http://') || url.startsWith('https://');
  }
}
