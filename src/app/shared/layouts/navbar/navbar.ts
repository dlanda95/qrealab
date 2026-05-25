import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';


@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, RouterLinkActive,LucideAngularModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  isScrolled = false;
  isMobileMenuOpen = false;
  // Aquí pondrás la URL de tu imagen en el futuro, ej: 'assets/logo-white.png'
  logoUrl: string | null = null;

  // Escucha el scroll de la ventana
  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Si baja más de 50px, cambia el estado
    this.isScrolled = window.scrollY > 20;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    
    // Bloquear el scroll del cuerpo cuando el menú está abierto
    if (this.isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

}
