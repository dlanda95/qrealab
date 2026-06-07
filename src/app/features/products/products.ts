import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';

import { PageHeader }    from '../../shared/ui/page-header/page-header';
import { ProductCard }   from '../../shared/ui/product-card/product-card';
import { ProductsService } from '../../core/products.service';
import { Product, ProductCategory } from '../../core/product.interface';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { LanguageService } from '../../core/language.service';

@Component({
  selector: 'app-products',
  imports: [PageHeader, ProductCard, RouterLink, TranslatePipe],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products implements OnInit {

  private svc = inject(ProductsService);
  lang = inject(LanguageService);

  loading     = signal(true);
  allProducts = signal<Product[]>([]);
  categories  = signal<ProductCategory[]>([]);
  selected    = signal<string>('all');

  filtered = computed(() => {
    const cat = this.selected();
    const all = this.allProducts();
    return cat === 'all' ? all : all.filter(p => p.category.slug === cat);
  });

  ngOnInit(): void {
    forkJoin({
      products:   this.svc.getProducts(),
      categories: this.svc.getCategories(),
    }).subscribe({
      next: ({ products, categories }) => {
        this.allProducts.set(products);
        this.categories.set(categories);
        this.loading.set(false);
      },
      error: err => {
        console.error('Error cargando productos:', err);
        this.loading.set(false);
      },
    });
  }

  selectCategory(slug: string): void {
    this.selected.set(slug);
  }

  countByCategory(slug: string): number {
    return this.allProducts().filter(p => p.category.slug === slug).length;
  }
}
