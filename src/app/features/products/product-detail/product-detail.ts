import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { LeafFrame }     from '../../../shared/ui/leaf-frame/leaf-frame';
import { PageHeader }    from '../../../shared/ui/page-header/page-header';
import { ProductCard }   from '../../../shared/ui/product-card/product-card';
import { ProductsService } from '../../../core/products.service';
import { Product } from '../../../core/product.interface';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';
import { LanguageService } from '../../../core/language.service';

@Component({
  selector: 'app-product-detail',
  imports: [RouterLink, LeafFrame, PageHeader, ProductCard, TranslatePipe],
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

    this.svc.getProductBySlug(slug).subscribe({
      next: product => {
        if (!product) { this.notFound.set(true); this.loading.set(false); return; }
        this.product.set(product);
        this.loading.set(false);

        // Load related products from the same category
        this.svc.getProducts().subscribe(all => {
          this.related.set(
            all.filter(p => p.category.slug === product.category.slug && p.id !== product.id).slice(0, 3)
          );
        });
      },
      error: () => { this.notFound.set(true); this.loading.set(false); },
    });
  }
}
