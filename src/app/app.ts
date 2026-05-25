import { Component, signal ,Inject,OnInit, PLATFORM_ID} from '@angular/core';
import { RouterOutlet } from '@angular/router';


import { Footer } from './shared/layouts/footer/footer';
import { Navbar } from './shared/layouts/navbar/navbar';
import { isPlatformBrowser } from '@angular/common'; // <--- IMPORTAR ESTO

import * as AOS from 'aos'; // <--- Importamos



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar,Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {



  // Inyectamos el ID de la plataforma para saber si estamos en servidor o navegador
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}


  protected readonly title = signal('qrealab');

  ngOnInit() {
    // EL FIX: Solo inicializar AOS si estamos en el navegador
    if (isPlatformBrowser(this.platformId)) {
      AOS.init({
        duration: 800,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
      });
    }
  }
}
