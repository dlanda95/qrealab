import {
  Component, Input,
  ElementRef, AfterViewInit, OnDestroy,
  PLATFORM_ID, Inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// ============================================================
//  LEAF FRAME  — Componente molde único de la hoja orgánica
//
//  Parallax: se setea --leaf-parallax-y en el host element.
//  .leaf-parallax lo consume via CSS: transform: translateY(var(...))
//
//  Ventaja sobre querySelector:
//  • Funciona aunque @if(imageSrc) renderice DESPUÉS de ngAfterViewInit
//  • Las CSS custom properties heredan sin importar el orden de render
//  • Angular ViewEncapsulation no afecta la herencia de custom props
// ============================================================

@Component({
  selector: 'app-leaf-frame',
  imports: [],
  templateUrl: './leaf-frame.html',
  styleUrl:    './leaf-frame.scss',
})
export class LeafFrame implements AfterViewInit, OnDestroy {

  @Input() imageSrc: string  = '';
  @Input() altText:  string  = 'Qrealab image';
  @Input() inverted: boolean = false;

  /** Intensidad del parallax (px). Rango recomendado: 40–100. */
  @Input() parallaxStrength: number = 80;

  private rafId: number | null = null;

  constructor(
    private el: ElementRef<HTMLElement>,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  // ── Lifecycle ────────────────────────────────────────────────

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Limpiar transform residual de implementaciones anteriores
    this.el.nativeElement.style.transform = '';

    // Inicializar la variable a 0 para evitar flash al primer scroll
    this.el.nativeElement.style.setProperty('--leaf-parallax-y', '0px');

    window.addEventListener('scroll', this.onScroll, { passive: true });
    window.addEventListener('resize', this.onScroll, { passive: true });

    // Calcular posición inicial correcta (por si la hoja ya está en pantalla)
    this.applyParallax();
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
    const host  = this.el.nativeElement;
    const rect  = host.getBoundingClientRect();
    const viewH = window.innerHeight;

    // Saltear cómputo si el elemento está muy lejos del viewport
    if (rect.bottom < -300 || rect.top > viewH + 300) return;

    // relPos: 0 = centrado en viewport · +0.5 = borde inferior · -0.5 = borde superior
    const relPos  = (rect.top + rect.height / 2 - viewH / 2) / viewH;
    const offsetY = relPos * this.parallaxStrength;

    // Setear custom property en el host → cascada a .leaf-parallax via CSS
    // Funciona aunque .leaf-parallax sea renderizado después por @if(imageSrc)
    host.style.setProperty('--leaf-parallax-y', `${offsetY.toFixed(2)}px`);
  }
}
