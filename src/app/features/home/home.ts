import { Component,OnInit,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionWrapper } from '../../shared/ui/section-wrapper/section-wrapper';
import { SplitSection } from '../../shared/ui/split-section/split-section';

import { HOME_CONTENT } from '../../data/home-content.data'; // Importamos los datos
import { HERO_SLIDES } from '../../data/home-content.data';

import { HeroCarouselComponent} from '../../shared/ui/hero-carousel/hero-carousel';




// 1. Importamos el servicio y la interfaz
import { HeroService } from '../../core/hero.service';
import { HeroSlide } from '../../core/hero-slide.interface';


@Component({
  selector: 'app-home',
  imports: [CommonModule, SectionWrapper, SplitSection,HeroCarouselComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
content = HOME_CONTENT;
  
  // 2. Empezamos con un arreglo vacío en lugar de los datos duros
  heroSlides: HeroSlide[] = []; 

  // 3. Inyectamos tu "puente" a Payload
  private heroService = inject(HeroService);




  ngOnInit(): void {


    // 4. Pedimos los datos al cargar la página
    this.heroService.getHeroSlides().subscribe({
      next: (data) => {
        console.log('🚀 ¡DATOS RECIBIDOS DESDE PAYLOAD CMS!', data);
        // 5. ¡Llenamos el carrusel con los datos de tu CMS!
        this.heroSlides = data; 
      },
      error: (err) => {
        console.error('❌ Error conectando con Payload:', err);
      }
    });
    
  }
}
