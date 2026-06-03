import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../../core/product.interface';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  @Input() product!: Product;
}
