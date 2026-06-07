import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product.interface';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { LanguageService } from '../../../core/i18n/language.service';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  @Input() product!: Product;
  lang = inject(LanguageService);
}
