export interface AboutStat {
  valor: string;
  etiqueta: string;
}

export interface AboutMember {
  id?: string;
  nombre: string;
  cargo: string;
  foto?: string;
  linkedin?: string;
}

export interface AboutGroup {
  id?: string;
  nombre: string;
  miembros: AboutMember[];
}

export interface Ally {
  id?: string;
  nombre: string;
  logo?: string;
  url?: string;
}

export interface AboutSettings {
  heroEyebrow: string;
  heroTitulo: string;
  heroSubtitulo: string;
  heroDescripcion: string;
  heroImagen?: string;
  heroStats: AboutStat[];
  misionTitulo: string;
  misionTexto: string;
  misionIcono: string;
  visionTitulo: string;
  visionTexto: string;
  visionIcono: string;
  equipoEyebrow: string;
  equipoTitulo: string;
  equipoGrupos: AboutGroup[];
  aliadosEyebrow: string;
  aliadosTitulo: string;
  aliadosSubtitulo: string;
  aliados: Ally[];
}

export const DEFAULT_ABOUT_SETTINGS: AboutSettings = {
  heroEyebrow: 'Nosotros',
  heroTitulo: 'Comprometidos con tu salud.',
  heroSubtitulo: 'Distribución farmacéutica de calidad',
  heroDescripcion: 'Somos una empresa farmacéutica especializada en la distribución y comercialización de productos de alta calidad, comprometidos con la salud y el bienestar de nuestros clientes en todo el país.',
  heroStats: [
    { valor: '15+',    etiqueta: 'Años de experiencia' },
    { valor: '500+',   etiqueta: 'Productos' },
    { valor: '1,200+', etiqueta: 'Clientes atendidos' },
    { valor: '100%',   etiqueta: 'Calidad garantizada' },
  ],
  misionTitulo: 'Nuestra Misión',
  misionTexto: 'Proveer soluciones farmacéuticas de alta calidad que contribuyan al bienestar de las personas, con un equipo comprometido con la excelencia, la ética profesional y el servicio personalizado.',
  misionIcono: 'target',
  visionTitulo: 'Nuestra Visión',
  visionTexto: 'Ser la empresa farmacéutica de referencia en el país, reconocida por la calidad de nuestros productos, la solidez de nuestras alianzas y el impacto positivo en la salud de la población.',
  visionIcono: 'eye',
  equipoEyebrow: 'Nuestro Equipo',
  equipoTitulo: 'Las personas que hacen posible Qrealab',
  equipoGrupos: [
    {
      nombre: 'Dirección',
      miembros: [
        { nombre: 'Ana Ramírez',   cargo: 'Directora General' },
        { nombre: 'Carlos Vega',   cargo: 'Director Comercial' },
        { nombre: 'Luis Peña',     cargo: 'Director de Operaciones' },
      ],
    },
    {
      nombre: 'Equipo Profesional',
      miembros: [
        { nombre: 'María Torres',  cargo: 'Gerente de Ventas' },
        { nombre: 'Juan Díaz',     cargo: 'Q.F. Responsable Técnico' },
        { nombre: 'Sofía Mendez',  cargo: 'Ejecutiva de Cuentas' },
        { nombre: 'Roberto Lara',  cargo: 'Analista de Regulación' },
      ],
    },
  ],
  aliadosEyebrow: 'Aliados Estratégicos',
  aliadosTitulo: 'Trabajamos con los mejores',
  aliadosSubtitulo: 'Nuestros socios estratégicos comparten nuestra visión de calidad, ética y compromiso con la salud.',
  aliados: [
    { nombre: 'Laboratorio Alpha' },
    { nombre: 'Distribuidora Salud' },
    { nombre: 'Farmacéutica Global' },
    { nombre: 'Bio Medicina S.A.' },
    { nombre: 'Tecno Pharma' },
    { nombre: 'Salud Integral' },
  ],
};
