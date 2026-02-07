import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-section-wrapper',
  imports: [CommonModule],
  templateUrl: './section-wrapper.html',
  styleUrl: './section-wrapper.scss',
})
export class SectionWrapper {

  @Input() backgroundColor: 'white' | 'gray' | 'dark' = 'white';

}
