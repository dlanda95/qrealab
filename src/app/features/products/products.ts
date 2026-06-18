import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { forkJoin } from 'rxjs';

import { HeroSection }    from '../../shared/ui/hero-section/hero-section';
import { ProductCard }   from '../../shared/ui/product-card/product-card';
import { ProductsService } from './services/products.service';
import { Product, ProductCategory } from '../../shared/models/product.interface';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { LanguageService } from '../../core/i18n/language.service';
import { SeoService }      from '../../core/services/seo.service';

@Component({
  selector: 'app-products',
  imports: [HeroSection, ProductCard, TranslatePipe],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products implements OnInit {

  private svc = inject(ProductsService);
  private seo = inject(SeoService);
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
    this.seo.set({
      title:       'Productos farmacéuticos | Qrealab',
      description: 'Catálogo completo de productos farmacéuticos Qrealab. Medicamentos y soluciones de alta calidad para profesionales y pacientes en Perú.',
      path:        '/products',
    });

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
