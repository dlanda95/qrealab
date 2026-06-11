import { Component, OnInit, inject, signal, PLATFORM_ID } from '@angular/core'
import { isPlatformBrowser, NgClass } from '@angular/common'
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'

import { PharmavigilanceService } from '../services/pharmavig.service'
import { PharmavigilanceConfig, FormSection, FormField } from '../models/pharmavig.interface'

type Status = 'idle' | 'loading' | 'submitting' | 'success' | 'error'

@Component({
  selector: 'app-pharmavig-form',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './pharmavig-form.html',
  styleUrl: './pharmavig-form.scss',
})
export class PharmavigilanceForm implements OnInit {

  private platformId = inject(PLATFORM_ID)
  private svc        = inject(PharmavigilanceService)
  private fb         = inject(FormBuilder)

  config   = signal<PharmavigilanceConfig | null>(null)
  form     = signal<FormGroup | null>(null)
  status   = signal<Status>('loading')
  errorMsg = signal<string | null>(null)

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.svc.getConfig().subscribe({
      next:  cfg => this.init(cfg),
      error: ()  => this.status.set('error'),
    })
  }

  activeCampos(section: FormSection): FormField[] {
    return section.campos.filter(c => c.activo)
  }

  hasError(clave: string): boolean {
    const ctrl = this.form()?.get(clave)
    return !!(ctrl?.invalid && ctrl?.touched)
  }

  submit(): void {
    const frm = this.form()
    const cfg = this.config()
    if (!frm || !cfg) return

    frm.markAllAsTouched()
    if (frm.invalid) return

    this.status.set('submitting')
    this.svc.submit(frm.value, cfg).subscribe({
      next:  () => this.status.set('success'),
      error: () => {
        this.status.set('error')
        this.errorMsg.set('Ocurrió un error al enviar. Por favor inténtelo nuevamente.')
      },
    })
  }

  reset(): void {
    this.form()?.reset()
    this.status.set('idle')
    this.errorMsg.set(null)
  }

  private init(cfg: PharmavigilanceConfig): void {
    this.config.set(cfg)
    this.form.set(this.buildForm(cfg))
    this.status.set('idle')
  }

  private buildForm(cfg: PharmavigilanceConfig): FormGroup {
    const controls: Record<string, any> = {}
    for (const section of cfg.secciones) {
      for (const field of section.campos) {
        if (!field.activo) continue
        controls[field.clave] = [
          '',
          field.requerido ? [Validators.required] : [],
        ]
        if (field.tipo === 'email') {
          controls[field.clave][1] = [
            ...(controls[field.clave][1] as any[]),
            Validators.email,
          ]
        }
      }
    }
    return this.fb.group(controls)
  }
}
