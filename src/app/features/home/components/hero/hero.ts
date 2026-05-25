
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-hero',
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero{



  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() imageSrc: string = '';
  @Input() ctaText: string = 'Conoce más';

  // Función para scroll suave al hacer clic en el botón
  scrollToContent() {
    const nextSection = document.querySelector('app-section-wrapper');
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  }

}
