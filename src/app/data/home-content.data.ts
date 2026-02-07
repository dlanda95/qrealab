export interface SectionContent {
  title: string;
  subtitle?: string;
  description: string[]; // Array para varios párrafos
  image?: string;
  ctaText?: string;
  ctaLink?: string;
}

export const HOME_CONTENT = {
  hero: {
    title: 'Welcome to QREALAB',
    subtitle: 'Innovación Farmacéutica',
    description: ['Calidad, confianza y tecnología al servicio de la vida.'],
    image: 'assets/images/hero-bg.jpg', // Tu imagen principal
    ctaText: 'Discover More'
  },
  story: {
    title: 'Our Story',
    description: [
      'QREALAB is a Peruvian company founded in 2024. Its shareholders have more than 25 years of executive experience...',
      'We focus on high quality probiotics and pharmaceutical products.'
    ],
    image: 'assets/images/team-hands.jpg',
    ctaText: 'Read Full Story'
  },
  mission: {
    title: 'Who We Are',
    description: [
      'Committed to providing quality probiotics and pharmaceutical products to the Peruvian market.',
      'Conforming to national and international standards.'
    ],
    image: 'assets/images/meeting.jpg'
  },
  values: [
    { title: 'Quality', icon: 'star', text: 'We comply with all requirements.' },
    { title: 'Innovation', icon: 'lightbulb', text: 'Constantly seeking new alternatives.' },
    { title: 'Growth', icon: 'trending_up', text: 'Conscious and energetic activity.' }
  ]
};