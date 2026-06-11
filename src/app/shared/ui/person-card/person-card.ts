import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-person-card',
  imports: [],
  templateUrl: './person-card.html',
  styleUrl:    './person-card.scss',
})
export class PersonCard {
  @Input() nombre   = '';
  @Input() cargo    = '';
  @Input() foto     = '';
  @Input() linkedin = '';
  @Input() inverted = false;
}
