import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'products/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      try {
        const res = await fetch(
          'https://qrealab-backend-production.up.railway.app/api/products?limit=100&depth=0'
        );
        const data = await res.json();
        return (data.docs ?? []).map((p: { slug: string }) => ({ slug: p.slug }));
      } catch {
        return [];
      }
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
