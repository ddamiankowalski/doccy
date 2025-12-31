import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Header } from './components/header/header';
import { RouterOutlet } from '@angular/router';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'dc-dashboard',
  imports: [Header, RouterOutlet, Footer],
  host: {
    class: 'block p-12 min-h-screen text-white',
  },
  template: `
    <dc-header />
    <router-outlet />
    <dc-footer />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard {}
