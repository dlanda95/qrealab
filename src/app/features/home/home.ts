import { Component,OnInit,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionWrapper } from '../../shared/ui/section-wrapper/section-wrapper';
import { SplitSection } from '../../shared/ui/split-section/split-section';


import { HeroCarouselComponent} from '../../shared/ui/hero-carousel/hero-carousel';




// 1. Importamos el servicio y la interfaz
import { HeroService } from '../../core/hero.service';
import { HeroSlide } from '../../core/hero-slide.interface';
import { HistoryService } from '../../core/history.service'; // Importa tu servicio
import {WhoweareService } from '../../core/whoweare.service'

@Component({
  selector: 'app-home',
  imports: [CommonModule, SectionWrapper, SplitSection,HeroCarouselComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  storyData: any;
whoweareData: any;
  // 2. Empezamos con un arreglo vacío en lugar de los datos duros
  heroSlides: HeroSlide[] = []; 

  // 3. Inyectamos tu "puente" a Payload
  private heroService = inject(HeroService);

  private historyService = inject(HistoryService);
private WhoweareService = inject(WhoweareService);



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




    this.historyService.getHistory().subscribe({
     
      
      next: (data) => {
        this.storyData = data;
        console.log(data)
      }
    });




    this.WhoweareService.getWhoweare().subscribe(data => this.whoweareData = data);







  
    
  }
}
