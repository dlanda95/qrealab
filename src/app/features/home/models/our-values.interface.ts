// ============================================================
//  OUR VALUES — Interfaces
//  Modelo de datos para la sección "Nuestros Valores"
//  Los datos vienen de Payload CMS (colección: our-values)
// ============================================================

export interface ValuePoint {
  label: string;
  description: string;
}

export interface OurValue {
  id: string;
  title: string;
  icon: string;       // Nombre del icono Lucide (ej: 'heart', 'lightbulb', 'trending-up')
  points: ValuePoint[];
}

export interface OurValuesSection {
  sectionTitle: string;
  image?: string;     // URL de la imagen decorativa (leaf frame)
  values: OurValue[];
}
