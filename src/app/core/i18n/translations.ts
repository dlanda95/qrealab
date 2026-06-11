export type Lang = 'es' | 'en';

export const UI: Record<Lang, Record<string, string>> = {
  es: {
    'nav.home':         'Inicio',
    'nav.about':        'Nosotros',
    'nav.products':     'Línea de Productos',
    'nav.vigilance':    'Farmacovigilancia',
    'nav.contact':      'Contáctenos',

    'breadcrumb.home':     'Inicio',
    'breadcrumb.products': 'Productos',

    'products.eyebrow':  'Portafolio',
    'products.title':    'Nuestros Productos',
    'products.subtitle': 'Soluciones farmacéuticas de alta calidad, respaldadas por innovación y ciencia.',
    'products.filterAll': 'Todos',
    'products.empty':    'No hay productos en esta categoría.',

    'product.view':        'Ver producto',
    'product.ingredient':  'Principio activo',
    'product.presentations': 'Presentaciones',
    'product.requestInfo': 'Solicitar información',
    'product.backToAll':   '← Ver todos los productos',
    'product.related':     'Productos relacionados',
    'product.notFound':    'Producto no encontrado.',

    'vigilance.heroEyebrow':  'Farmacovigilancia',
    'vigilance.heroTitle':    'Tu seguridad, nuestra responsabilidad',
    'vigilance.heroSubtitle': 'Reporta cualquier efecto adverso de nuestros medicamentos y contribuye a la seguridad de todos los pacientes.',

    'vigilance.eyebrow': 'Información Importante',
    'vigilance.title':   '¿Qué necesitas saber?',
  },
  en: {
    'nav.home':         'Home',
    'nav.about':        'About Us',
    'nav.products':     'Product Line',
    'nav.vigilance':    'Pharmacovigilance',
    'nav.contact':      'Contact Us',

    'breadcrumb.home':     'Home',
    'breadcrumb.products': 'Products',

    'products.eyebrow':  'Portfolio',
    'products.title':    'Our Products',
    'products.subtitle': 'High-quality pharmaceutical solutions, backed by innovation and science.',
    'products.filterAll': 'All',
    'products.empty':    'No products found in this category.',

    'product.view':        'View product',
    'product.ingredient':  'Active ingredient',
    'product.presentations': 'Presentations',
    'product.requestInfo': 'Request information',
    'product.backToAll':   '← View all products',
    'product.related':     'Related products',
    'product.notFound':    'Product not found.',

    'vigilance.heroEyebrow':  'Pharmacovigilance',
    'vigilance.heroTitle':    'Your safety, our responsibility',
    'vigilance.heroSubtitle': 'Report any adverse effects from our medications and contribute to the safety of all patients.',

    'vigilance.eyebrow': 'Important Information',
    'vigilance.title':   'What you need to know',
  },
};
