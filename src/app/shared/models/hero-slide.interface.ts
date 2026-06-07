export interface HeroSlide {
  id: number;
  image: string;       // URL de la imagen de fondo
  tag?: string;        // Ej: "NUEVO LANZAMIENTO"
  title: string;       // Soporta HTML
  subtitle?: string;
  cta?: {              // Botón opcional
    text: string;
    link: string;
  };
}
