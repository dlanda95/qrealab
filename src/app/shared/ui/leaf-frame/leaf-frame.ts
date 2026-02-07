import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-leaf-frame',
  imports: [CommonModule],
  templateUrl: './leaf-frame.html',
  styleUrl: './leaf-frame.scss',
})
export class LeafFrame {

  @Input() imageSrc: string = ''; // URL de la imagen (opcional)
  @Input() altText: string = 'Qrealab image';
  @Input() inverted: boolean = false; // Invierte la forma de la hoja si es true
  
  // Calcula el radio dinámicamente si se invierte
  get borderRadius() {
    return this.inverted ? '80px 0px 80px 0px' : '0px 80px 0px 80px';
  }

}
