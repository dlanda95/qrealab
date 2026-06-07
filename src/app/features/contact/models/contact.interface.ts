export type FormaContacto = 'whatsapp' | 'telefono' | 'correo';

export interface ContactFormData {
  nombres:         string;
  apellidos:       string;
  telefono:        string;
  correo:          string;
  formaContacto:   FormaContacto;
  mensaje?:        string;
  aceptaPoliticas: boolean;
}

// ── Payload Global: contact-settings ────────────────────────────────────────

export interface ContactOption {
  id?:      string;
  valor:    FormaContacto;
  etiqueta: string;       // valor ya localizado por Payload según ?locale=
  icono:    string;
  activo:   boolean;
}

export interface ContactSettings {
  // WhatsApp
  whatsappNumero:      string;
  whatsappMensaje:     string;
  whatsappNombreAgente:string;
  whatsappRolAgente:   string;
  whatsappDisponible:  boolean;
  // Panel WhatsApp textos
  waTitulo:    string;
  waSubtitulo: string;
  waBtnTexto:  string;
  // Opciones de contacto
  opcionesContacto: ContactOption[];
  // Formulario textos
  formEyebrow:         string;
  formTitulo:          string;
  formBtnEnviar:       string;
  formTituloExito:     string;
  formSubtituloExito:  string;
  // Política de privacidad
  politicaTexto:     string;
  politicaLinkTexto: string;
  politicaLinkUrl:   string;
  // Contacto directo
  telefono: string;
  email:    string;
}

export const DEFAULT_CONTACT_SETTINGS: ContactSettings = {
  whatsappNumero:       '51957255145',
  whatsappMensaje:      'Hola, me interesa información sobre Qrealab',
  whatsappNombreAgente: 'Qrealab',
  whatsappRolAgente:    'Asesor Comercial',
  whatsappDisponible:   true,
  waTitulo:    'Conversemos por WhatsApp',
  waSubtitulo: 'Recibe información personalizada directamente en tu WhatsApp',
  waBtnTexto:  'Iniciar Chat',
  opcionesContacto: [
    { valor: 'whatsapp', etiqueta: 'WhatsApp', icono: 'message-circle', activo: true },
    { valor: 'telefono', etiqueta: 'Llamada',  icono: 'phone',          activo: true },
    { valor: 'correo',   etiqueta: 'Email',    icono: 'mail',           activo: true },
  ],
  formEyebrow:        'Contáctanos',
  formTitulo:         'Déjanos un mensaje',
  formBtnEnviar:      'Enviar Mensaje',
  formTituloExito:    '¡Mensaje enviado!',
  formSubtituloExito: 'Nos pondremos en contacto contigo a la brevedad.',
  politicaTexto:     'He leído y acepto las {{link}}, y autorizo expresamente a Qrealab al uso de mis datos personales según dispuesto en la Ley N° 29733 — Ley de Protección de Datos Personales.',
  politicaLinkTexto: 'Políticas de Privacidad y Datos Personales',
  politicaLinkUrl:   '#',
  telefono: '+51 957 255 145',
  email:    'info@qrealab.com',
};
