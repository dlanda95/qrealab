import { HeroSlide } from "../core/hero-slide.interface";

export interface SectionContent {
  title: string;
  subtitle?: string;
  description: string[]; // Array para varios párrafos
  image?: string;
  ctaText?: string;
  ctaLink?: string;
}

//export const HOME_CONTENT = {
  // hero: {
  //   title: 'Welcome to QREALAB',
  //   subtitle: 'Ciencia que transforma vidas.',
  //   description: ['Calidad, confianza y tecnología al servicio de la vida.'],
  //   image: 'assets/images/img-001.jpg', // Tu imagen principal
  //   ctaText: 'Discover More'
  // },
  // story: {
  //   title: 'Our Story',
  //   description: [
  //     'QREALAB is a Peruvian company founded in 2024. Its shareholders have more than 25 years of executive experience...',
  //     'We focus on high quality probiotics and pharmaceutical products.'
  //   ],
  //   image: 'assets/images/img-001.jpg',
  //   ctaText: 'Read Full Story'
  // },
  // mission: {
  //   title: 'Who We Are',
  //   description: [
  //     'Committed to providing quality probiotics and pharmaceutical products to the Peruvian market.',
  //     'Conforming to national and international standards.'
  //   ],
  //   image: 'assets/images/meeting.jpg'
  // },
  
//};



// export const HERO_SLIDES: HeroSlide[] = [
//   {
//     id: 1,
//     image: 'assets/images/img-001.jpg', // Tu foto de laboratorio
//     tag: 'INNOVACIÓN FARMACÉUTICA',
//     title: 'Welcome to <span class="text-gradient">QREALAB</span>',
//     subtitle: 'Desarrollamos soluciones de vida con los más altos estándares de calidad y tecnología.',
//     cta: { text: 'Conoce más', link: '/about' }
//   },
//   {
//     id: 2,
//     image: 'assets/images/img-001.jpg', // Otra foto
//     tag: 'NUESTRA MISIÓN',
//     title: 'Compromiso con la <span class="text-green">Salud</span>',
//     subtitle: 'Llevando bienestar a cada rincón del Perú a través de la ciencia.',
//     cta: { text: 'Ver Productos', link: '/products' }
//   }
// ];