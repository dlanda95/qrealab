export interface NavItem {
  id?: string;
  etiqueta: string;
  ruta: string;
  activo: boolean;
}

export interface NavSettings {
  items: NavItem[];
  ctaLabel: string;
}

export const DEFAULT_NAV_SETTINGS: NavSettings = {
  items: [
    { etiqueta: 'Inicio',             ruta: '/',          activo: true },
    { etiqueta: 'Nosotros',           ruta: '/about',     activo: true },
    { etiqueta: 'Línea de Productos', ruta: '/products',  activo: true },
    { etiqueta: 'Farmacovigilancia',  ruta: '/vigilance', activo: true },
  ],
  ctaLabel: 'Contáctenos',
};
