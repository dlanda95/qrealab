import { Routes } from '@angular/router';
import { Home } from './features/home/home';

export const routes: Routes = [
  { path: '', component: Home },
  {
    path: 'products',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/products/products').then(m => m.Products),
      },
      {
        path: ':slug',
        loadComponent: () =>
          import('./features/products/product-detail/product-detail').then(m => m.ProductDetail),
      },
    ],
  },
  {
    path: 'vigilance',
    loadComponent: () =>
      import('./features/vigilance/vigilance').then(m => m.Vigilance),
  },
  { path: '**', redirectTo: '' },
];
