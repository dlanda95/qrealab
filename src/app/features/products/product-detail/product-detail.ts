import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { switchMap, map, of } from 'rxjs';

import { PageHeader }      from '../../../shared/ui/page-header/page-header';
import { ProductCard }     from '../../../shared/ui/product-card/product-card';
import { ProductsService } from '../services/products.service';
import { Product }         from '../../../shared/models/product.interface';
import { TranslatePipe }   from '../../../shared/pipes/translate.pipe';
import { LanguageService } from '../../../core/i18n/language.service';

@Component({
  selector: 'app-product-detail',
  imports: [RouterLink, PageHeader, ProductCard, TranslatePipe],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetail implements OnInit {

  private route = inject(ActivatedRoute);
  private svc   = inject(ProductsService);
  lang = inject(LanguageService);

  product  = signal<Product | null>(null);
  related  = signal<Product[]>([]);
  loading  = signal(true);
  notFound = signal(false);

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';

    this.svc.getProductBySlug(slug).pipe(
      switchMap(product => {
        if (!product) return of({ product: null, related: [] as Product[] });
        return this.svc.getProducts().pipe(
          map(all => ({
            product,
            related: all
              .filter(p => p.category.slug === product.category.slug && p.id !== product.id)
              .slice(0, 3),
          }))
        );
      })
    ).subscribe({
      next: ({ product, related }) => {
        this.loading.set(false);
        if (!product) { this.notFound.set(true); return; }
        this.product.set(product);
        this.related.set(related);
      },
      error: () => { this.notFound.set(true); this.loading.set(false); },
    });
  }
}
