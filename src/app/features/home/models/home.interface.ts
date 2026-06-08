import { HeroSlide }   from '../../../shared/models/hero-slide.interface';
import { OurValue }     from './our-values.interface';

export interface HistorySectionData {
  title: string;
  description: string[];
  image?: string;
}

export interface WhoWeareSectionData {
  title: string;
  description: string[];
  image?: string;
}

export interface OurValuesSectionData {
  sectionTitle: string;
  image?: string;
  values: OurValue[];
}

export interface HomeSettings {
  heroSlides:       HeroSlide[];
  histTitle:        string;
  histDescription:  string;
  histImage?:       string;
  whoTitle:         string;
  whoDescription:   string;
  whoImage?:        string;
  valSectionTitle:  string;
  valImage?:        string;
  values:           OurValue[];
}

export const DEFAULT_HOME_SETTINGS: HomeSettings = {
  heroSlides: [],
  histTitle:       'Nuestra Historia',
  histDescription: 'Desde nuestros inicios hemos estado comprometidos con la salud de la población.',
  whoTitle:        'Quiénes Somos',
  whoDescription:  'Somos una empresa farmacéutica comprometida con la calidad y el bienestar.',
  valSectionTitle: 'Nuestros Valores',
  values: [],
};
