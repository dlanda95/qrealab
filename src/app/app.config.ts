import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import {
  LucideAngularModule,
  // Layout / nav
  Menu, X, ChevronDown, Globe,
  // Contacto
  MessageCircle, Phone, Mail, ArrowRight, CircleCheck,
  // Valores — íconos disponibles para Payload CMS
  Heart, Lightbulb, TrendingUp,
  Shield, Star, Users, Award,
  Target, Leaf, HandHeart, Brain,
  BookOpen, Rocket, Eye,
} from 'lucide-angular';

import { importProvidersFrom } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',  // scroll al inicio en cada navegación
        anchorScrolling: 'enabled',        // permite #fragment links
      })
    ),
    provideClientHydration(withEventReplay()),
    importProvidersFrom(
      LucideAngularModule.pick({
        // Nav
        Menu, X, ChevronDown, Globe,
        // Contacto
        MessageCircle, Phone, Mail, ArrowRight, CircleCheck,
        // Our Values — íconos semánticos para valores corporativos
        Heart, Lightbulb, TrendingUp,
        Shield, Star, Users, Award,
        Target, Leaf, HandHeart, Brain,
        BookOpen, Rocket, Eye,
      })
    ),
    provideHttpClient(withFetch()),
  ]
};
