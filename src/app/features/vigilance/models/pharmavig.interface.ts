export type FieldType = 'text' | 'email' | 'number' | 'date' | 'textarea' | 'radio' | 'select'
export type FieldWidth = 'full' | 'half' | 'third'

export interface FieldOption {
  valor:    string
  etiqueta: string
}

export interface FormField {
  clave:        string
  etiqueta:     string
  tipo:         FieldType
  ancho:        FieldWidth
  requerido:    boolean
  activo:       boolean
  placeholder?: string
  opciones:     FieldOption[]
}

export interface FormSection {
  titulo: string
  campos: FormField[]
}

export interface PharmavigilanceConfig {
  titulo:             string
  subtitulo:          string
  descripcion?:       string
  secciones:          FormSection[]
  emailContacto?:     string
  telefonoContacto?:  string
  direccionContacto?: string
}
