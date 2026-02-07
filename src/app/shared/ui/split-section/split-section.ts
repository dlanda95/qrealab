import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafFrame } from '../leaf-frame/leaf-frame'; // Tu componente existente

@Component({
  selector: 'app-split-section',
  imports: [CommonModule, LeafFrame],
  templateUrl: './split-section.html',
  styleUrl: './split-section.scss',
})
export class SplitSection {


  @Input() title: string = '';
  @Input() description: string[] = [];
  @Input() imageSrc: string = '';
  @Input() ctaText?: string;
  @Input() imagePosition: 'left' | 'right' = 'right'; // Configurable
  @Input() leafInverted: boolean = false; // Configurable

}
