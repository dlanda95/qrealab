import { Pipe, PipeTransform, inject } from '@angular/core';
import { LanguageService } from '../../core/language.service';

@Pipe({ name: 't', standalone: true, pure: true })
export class TranslatePipe implements PipeTransform {
  private lang = inject(LanguageService);
  transform(key: string): string {
    return this.lang.t(key);
  }
}
