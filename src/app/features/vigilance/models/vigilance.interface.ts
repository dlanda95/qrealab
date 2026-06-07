// ============================================================
//  VIGILANCE — Interfaces
// ============================================================

export interface VigilanceSlide {
  tag?:      string;
  title:     string;
  subtitle?: string;
  ctaText?:  string;
  ctaLink?:  string;
  image:     string;
}

export interface InfoBlockItem {
  text: string;
}

export interface InfoBlock {
  title: string;
  style: 'bullet' | 'numbered';
  items: InfoBlockItem[];
}

export interface VigilanceData {
  slides:     VigilanceSlide[];
  infoBlocks: InfoBlock[];
}
