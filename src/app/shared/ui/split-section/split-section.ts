import { Component, Input } from '@angular/core';
import { LeafFrame } from '../leaf-frame/leaf-frame';

@Component({
  selector: 'app-split-section',
  imports: [LeafFrame],
  templateUrl: './split-section.html',
  styleUrl: './split-section.scss',
})
export class SplitSection {

  @Input() title: string = '';
  @Input() description: string[] = [];
  @Input() imageSrc: string = '';
  @Input() ctaText?: string;
  @Input() imagePosition: 'left' | 'right' = 'right';
  @Input() leafInverted: boolean = false;

}
