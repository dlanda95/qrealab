import { HttpInterceptorFn } from '@angular/common/http'
import { inject, PLATFORM_ID } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'
import { EMPTY } from 'rxjs'

/**
 * Durante SSR (prerendering), todas las peticiones HTTP se omiten y se devuelve
 * EMPTY. Los componentes muestran su estado inicial (skeleton / i18n fallback)
 * y el cliente completa la carga tras la hidratación en el navegador.
 */
export const ssrNoFetchInterceptor: HttpInterceptorFn = (req, next) => {
  if (!isPlatformBrowser(inject(PLATFORM_ID))) return EMPTY
  return next(req)
}
