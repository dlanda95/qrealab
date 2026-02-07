import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server'; // <--- CAMBIO CLAVE
// Para las rutas si las usas, sino usa solo withRoutes de platform-server si la version lo permite, pero mejor simplifiquemos:
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    // <--- Asegúrate que esto esté así
    // Si necesitas las rutas de servidor, en versiones recientes se inyectan distinto,
    // pero para solucionar el error NG0401, primero aseguremos el renderizado.
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);