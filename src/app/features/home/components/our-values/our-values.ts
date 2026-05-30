import { Component, Input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { LeafFrame } from '../../../../shared/ui/leaf-frame/leaf-frame';
import { OurValue } from '../../../../core/our-values.interface';

// ============================================================
//  OUR VALUES COMPONENT
//  Uso: <app-our-values [sectionTitle]="..." [image]="..."
//                       [values]="[...]">
//  Los datos los pasa home.ts luego de consumir OurValuesService
// ============================================================

@Component({
  selector: 'app-our-values',
  standalone: true,
  imports: [LucideAngularModule, LeafFrame],
  templateUrl: './our-values.html',
  styleUrl: './our-values.scss',
})
export class OurValues {
  @Input() sectionTitle: string  = 'Nuestros Valores';
  @Input() image?: string;
  @Input() values: OurValue[]    = [];
}
