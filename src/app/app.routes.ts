import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home').then(m => m.Home),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./features/about/about').then(m => m.About),
  },
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
  {
    path: '**',
    loadComponent: () => import('./shared/ui/not-found/not-found').then(m => m.NotFound),
  },
];
