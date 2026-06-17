import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <div class="nf-wrap">
      <p class="nf-code">404</p>
      <h1 class="nf-title">Página no encontrada</h1>
      <a class="nf-link" routerLink="/">Volver al inicio</a>
    </div>
  `,
  styles: [`
    .nf-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 60vh;
      text-align: center;
      padding: 4rem 1rem;
      font-family: var(--font-heading, sans-serif);
    }
    .nf-code {
      font-size: clamp(5rem, 18vw, 9rem);
      font-weight: 900;
      color: var(--qrl-green, #2EC643);
      line-height: 1;
      margin: 0 0 .5rem;
    }
    .nf-title {
      font-size: clamp(1.4rem, 4vw, 2rem);
      font-weight: 700;
      color: var(--qrl-navy, #0A1145);
      margin: 0 0 2rem;
    }
    .nf-link {
      background: var(--qrl-navy, #0A1145);
      color: #fff;
      font-size: .9rem;
      font-weight: 700;
      padding: .75rem 2rem;
      border-radius: 100px;
      text-decoration: none;
      transition: opacity .2s;
      &:hover { opacity: .8; }
    }
  `],
})
export class NotFound {}
