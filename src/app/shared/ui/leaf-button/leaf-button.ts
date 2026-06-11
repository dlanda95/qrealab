import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-leaf-button',
  imports: [NgClass],
  templateUrl: './leaf-button.html',
  styleUrl:    './leaf-button.scss',
  host: { '[class.is-loading]': 'loading' },
})
export class LeafButton {
  @Input() variant      : 'primary' | 'outline' = 'primary';
  @Input() size         : 'sm' | 'md' | 'lg'    = 'md';
  @Input() type         : 'button' | 'submit'   = 'button';
  @Input() disabled     = false;
  @Input() loading      = false;
  @Input() loadingLabel = 'Enviando...';
}
