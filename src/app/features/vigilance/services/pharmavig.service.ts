import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, map, shareReplay, catchError, of } from 'rxjs'

import { environment } from '../../../../environments/environment'
import { PharmavigilanceConfig, FormField } from '../models/pharmavig.interface'

@Injectable({ providedIn: 'root' })
export class PharmavigilanceService {

  private http = inject(HttpClient)
  private base = environment.apiUrl

  private config$: Observable<PharmavigilanceConfig> | null = null

  private readonly defaultConfig: PharmavigilanceConfig = {
    titulo: 'Formulario de reporte',
    subtitulo: 'Efectos o reacciones adversas al medicamento',
    secciones: [],
  }

  getConfig(): Observable<PharmavigilanceConfig> {
    if (!this.config$) {
      this.config$ = this.http
        .get<any>(`${this.base}/api/globals/pharmavigilance-settings`)
        .pipe(
          map(res => this.mapConfig(res)),
          catchError(() => of(this.defaultConfig)),
          shareReplay(1),
        )
    }
    return this.config$
  }

  submit(values: Record<string, unknown>, config: PharmavigilanceConfig): Observable<unknown> {
    const labeledValues = this.buildLabeledValues(values, config)
    const body = {
      nombreRemitente: (values['nombreCompleto'] as string) ?? 'Anónimo',
      correoRemitente: (values['correo'] as string) ?? '',
      respuestas:      labeledValues,
    }
    return this.http.post(`${this.base}/api/pharmavigilance-submissions`, body)
  }

  private buildLabeledValues(
    values: Record<string, unknown>,
    config: PharmavigilanceConfig,
  ): Record<string, string> {
    const allFields = config.secciones.flatMap(s => s.campos)
    const fieldMap = new Map<string, FormField>(allFields.map(f => [f.clave, f]))
    const result: Record<string, string> = {}

    for (const [key, raw] of Object.entries(values)) {
      if (raw === null || raw === undefined || raw === '') continue
      const field = fieldMap.get(key)
      const label = field?.etiqueta ?? key
      let display = String(raw)

      if (field?.tipo === 'radio' || field?.tipo === 'select') {
        const opt = field.opciones?.find(o => o.valor === raw)
        if (opt) display = opt.etiqueta
      }

      result[label] = display
    }

    return result
  }

  private mapConfig(res: any): PharmavigilanceConfig {
    return {
      titulo:             res.titulo     ?? 'Formulario de reporte',
      subtitulo:          res.subtitulo  ?? 'Efectos o reacciones adversas al medicamento',
      descripcion:        res.descripcion,
      emailContacto:      res.emailContacto,
      telefonoContacto:   res.telefonoContacto,
      direccionContacto:  res.direccionContacto,
      secciones: (res.secciones ?? []).map((s: any) => ({
        titulo: s.titulo,
        campos: (s.campos ?? []).map((c: any) => ({
          clave:       c.clave,
          etiqueta:    c.etiqueta,
          tipo:        c.tipo,
          ancho:       c.ancho ?? 'full',
          requerido:   c.requerido ?? false,
          activo:      c.activo ?? true,
          placeholder: c.placeholder ?? '',
          opciones:    (c.opciones ?? []).map((o: any) => ({
            valor:    o.valor,
            etiqueta: o.etiqueta,
          })),
        })).filter((c: any) => c.activo),
      })),
    }
  }
}
