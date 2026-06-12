export interface InfoBlockItem {
  text: string;
}

export interface InfoBlock {
  title: string;
  style: 'bullet' | 'numbered';
  items: InfoBlockItem[];
}

export interface VigilanceData {
  heroEyebrow:   string;
  heroTitulo:    string;
  heroSubtitulo: string;
  infoEyebrow:   string;
  infoTitulo:    string;
  infoBlocks:    InfoBlock[];
}
