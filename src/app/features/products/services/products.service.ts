import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product, ProductCategory } from '../../../shared/models/product.interface';
import { LanguageService } from '../../../core/i18n/language.service';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private http = inject(HttpClient);
  private lang = inject(LanguageService);
  private base = environment.apiUrl;

  getCategories(): Observable<ProductCategory[]> {
    return this.http
      .get<any>(`${this.base}/api/product-categories?sort=_order&limit=100&locale=${this.lang.currentLang()}`)
      .pipe(map(res => res.docs.map((d: any) => ({ id: d.id, name: d.name, slug: d.slug }))));
  }

  getProducts(): Observable<Product[]> {
    return this.http
      .get<any>(`${this.base}/api/products?depth=1&where[status][equals]=active&sort=_order&limit=200&locale=${this.lang.currentLang()}`)
      .pipe(map(res => res.docs.map((d: any) => this.mapProduct(d))));
  }

  getProductBySlug(slug: string): Observable<Product | null> {
    return this.http
      .get<any>(`${this.base}/api/products?depth=1&where[slug][equals]=${slug}&limit=1&locale=${this.lang.currentLang()}`)
      .pipe(map(res => (res.docs[0] ? this.mapProduct(res.docs[0]) : null)));
  }

  private mapProduct(d: any): Product {
    const imgUrl     = d.image?.url;
    const insertoUrl = d.inserto?.url;
    return {
      id:               d.id,
      name:             d.name,
      slug:             d.slug,
      category:         { id: d.category?.id, name: d.category?.name, slug: d.category?.slug },
      tagline:          d.tagline,
      activeIngredient: d.activeIngredient,
      description:      d.description,
      image:            imgUrl     ? (imgUrl.startsWith('http')     ? imgUrl     : `${this.base}${imgUrl}`)     : undefined,
      inserto:          insertoUrl ? (insertoUrl.startsWith('http') ? insertoUrl : `${this.base}${insertoUrl}`) : undefined,
      presentations:    (d.presentations ?? []).map((p: any) => ({ label: p.label })),
      featured:         d.featured ?? false,
      status:           d.status ?? 'active',
    };
  }
}
