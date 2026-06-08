import {
  Component, inject, PLATFORM_ID,
  AfterViewInit, OnInit, OnDestroy,
  signal, computed,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

import { ContactModalService }   from '../../services/contact-modal.service';
import { ContactSettingsService } from '../../services/contact-settings.service';
import { ContactService }         from '../../services/contact.service';
import { FormaContacto }          from '../../models/contact.interface';
import { LeafButton }             from '../../../../shared/ui/leaf-button/leaf-button';

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

@Component({
  selector: 'app-contact-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule, LeafButton],
  templateUrl: './contact-modal.html',
  styleUrl:    './contact-modal.scss',
})
export class ContactModal implements OnInit, AfterViewInit, OnDestroy {

  readonly modal    = inject(ContactModalService);
  private  svc      = inject(ContactService);
  private  cfgSvc   = inject(ContactSettingsService);
  private  pid      = inject(PLATFORM_ID);

  submitStatus = signal<SubmitStatus>('idle');

  // ── Settings desde CMS (con defaults mientras carga) ──────────────────────
  readonly cfg = this.cfgSvc.settings;

  // ── URL de WhatsApp derivada de la config ─────────────────────────────────
  readonly whatsappUrl = computed(() => {
    const s = this.cfg();
    const msg = encodeURIComponent(s.whatsappMensaje || '');
    return `https://wa.me/${s.whatsappNumero}?text=${msg}`;
  });

  // ── Opciones activas (filtradas desde CMS) ────────────────────────────────
  readonly activeOptions = computed(() =>
    this.cfg().opcionesContacto?.filter(o => o.activo) ?? [],
  );

  // ── Texto de política partido en [antes, después] del enlace ─────────────
  readonly politica = computed(() => {
    const s   = this.cfg();
    const raw = s.politicaTexto || '';
    const parts = raw.split('{{link}}');
    return {
      antes:     parts[0] ?? '',
      despues:   parts[1] ?? '',
      linkTexto: s.politicaLinkTexto || 'Políticas de Privacidad',
      linkUrl:   s.politicaLinkUrl   || '#',
    };
  });

  // ── Formulario reactivo ───────────────────────────────────────────────────
  form = new FormGroup({
    nombres:         new FormControl('',    [Validators.required]),
    apellidos:       new FormControl('',    [Validators.required]),
    telefono:        new FormControl('',    [Validators.required, Validators.minLength(7)]),
    correo:          new FormControl('',    [Validators.required, Validators.email]),
    formaContacto:   new FormControl<FormaContacto>('whatsapp'),
    mensaje:         new FormControl(''),
    aceptaPoliticas: new FormControl(false, [Validators.requiredTrue]),
  });

  get f() { return this.form.controls; }

  isInvalid(field: keyof typeof this.form.controls): boolean {
    const c = this.form.get(field as string);
    return !!(c?.invalid && c.touched);
  }

  setForma(v: FormaContacto): void {
    this.form.patchValue({ formaContacto: v });
  }

  // ── Lifecycle ─────────────────────────────────────────────────────────────
  ngOnInit(): void {
    this.cfgSvc.load().subscribe();
  }

  private readonly escFn = (e: KeyboardEvent) => {
    if (e.key === 'Escape') this.modal.close();
  };

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.pid)) document.addEventListener('keydown', this.escFn);
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.pid)) document.removeEventListener('keydown', this.escFn);
  }

  onOverlayClick(e: MouseEvent): void {
    if ((e.target as HTMLElement).classList.contains('cm-overlay')) this.modal.close();
  }

  // ── Submit ────────────────────────────────────────────────────────────────
  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitStatus.set('loading');

    this.svc.submit(this.form.getRawValue() as any).subscribe({
      next: () => {
        this.submitStatus.set('success');
        this.form.reset({ formaContacto: 'whatsapp', aceptaPoliticas: false });
      },
      error: () => this.submitStatus.set('error'),
    });
  }

  resetStatus(): void { this.submitStatus.set('idle'); }
}
