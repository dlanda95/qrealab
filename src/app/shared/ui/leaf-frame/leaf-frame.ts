import {
  Component, Input, ViewChild, ElementRef,
  AfterViewInit, OnChanges, OnDestroy, SimpleChanges,
  PLATFORM_ID, Inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// ============================================================
//  LEAF FRAME  — Componente molde único de la hoja orgánica
//
//  Arquitectura de capas:
//  ┌─ :host ─────────────────────────────────────────────────┐
//  │  └─ .leaf-wrapper  (border-radius, glow, hover lift)    │
//  │       ├─ .leaf-glow-border  → aura verde difusa         │
//  │       └─ .leaf-mask  → LA VENTANA (overflow:hidden)     │
//  │             ├─ .leaf-parallax  → fondo deslizante       │
//  │             │     └─ .leaf-media  → imagen (background) │
//  │             └─ .leaf-content  → slot ng-content         │
//  └─────────────────────────────────────────────────────────┘
//
//  Parallax:
//  ─────────
//  .leaf-parallax se extiende un BUFFER por arriba y abajo de
//  .leaf-mask (ver SCSS: inset con valor negativo).
//  JS aplica translateY directamente al elemento via @ViewChild —
//  sin pasar por CSS custom properties ni querySelector.
//
//  Por qué @ViewChild en lugar de querySelector:
//  • .leaf-parallax SIEMPRE está en el DOM (no dentro de @if)
//    → @ViewChild lo encuentra aunque imageSrc llegue async del CMS
//  • Referencia directa al nativeElement → sin riesgo de null
//
//  parallaxStrength (px):
//  • Define el desplazamiento máximo de la imagen (en viewport center = 0)
//  • Recomendado: 160–300 para impacto visible
//  • El buffer del SCSS debe ser ≥ parallaxStrength / 2
// ============================================================

@Component({
  selector: 'app-leaf-frame',
  imports: [],
  templateUrl: './leaf-frame.html',
  styleUrl:    './leaf-frame.scss',
})
export class LeafFrame implements AfterViewInit, OnChanges, OnDestroy {

  @Input() imageSrc:         string  = '';
  @Input() altText:          string  = 'Qrealab image';
  @Input() inverted:         boolean = false;

  /**
   * Desplazamiento máximo en px que aplica el parallax.
   * Mayor valor = efecto más dramático.
   * Debe ser ≤ (buffer SCSS) × (alto del frame).
   * Con inset: -50% 0 en SCSS y frame ~400px → buffer = 200px → max 200px.
   */
  @Input() parallaxStrength: number = 220;

  /** Referencia directa al contenedor parallax (siempre en DOM). */
  @ViewChild('leafParallax') private leafParallaxRef!: ElementRef<HTMLElement>;

  private rafId: number | null = null;

  constructor(
    private el: ElementRef<HTMLElement>,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  // ── Lifecycle ────────────────────────────────────────────────

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    window.addEventListener('scroll', this.onScroll, { passive: true });
    window.addEventListener('resize', this.onScroll, { passive: true });
    this.applyParallax();
  }

  /**
   * ngOnChanges: cuando imageSrc llega async del CMS, Angular
   * renderiza @if(imageSrc) en la siguiente detección de cambios.
   * Forzamos un cálculo de parallax tras dos frames para asegurar
   * que .leaf-media ya esté en el DOM con su tamaño correcto.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['imageSrc'] && isPlatformBrowser(this.platformId)) {
      // Double rAF: Angular renderiza el @if entre el 1.º y 2.º frame
      requestAnimationFrame(() => requestAnimationFrame(() => this.applyParallax()));
    }
  }

  ngOnDestroy(): void {
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onScroll);
  }

  // ── Parallax engine ──────────────────────────────────────────

  private onScroll = (): void => {
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
    this.rafId = requestAnimationFrame(() => this.applyParallax());
  };

  private applyParallax(): void {
    const parallaxEl = this.leafParallaxRef?.nativeElement;
    if (!parallaxEl) return;

    const host  = this.el.nativeElement;
    const rect  = host.getBoundingClientRect();
    const viewH = window.innerHeight;

    // Omitir cómputo si el elemento está muy lejos del viewport
    if (rect.bottom < -viewH || rect.top > viewH * 2) return;

    // relPos: −0.5 = sale por arriba · 0 = centrado · +0.5 = entra por abajo
    const relPos  = (rect.top + rect.height / 2 - viewH / 2) / viewH;
    const offsetY = relPos * this.parallaxStrength;

    // Aplicar transform directo: sin CSS custom properties, sin overhead
    parallaxEl.style.transform = `translateY(${offsetY.toFixed(2)}px)`;
  }
}
