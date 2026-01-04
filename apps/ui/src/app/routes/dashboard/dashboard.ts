import { Component } from '@angular/core';
import { Header } from './components/header/header';
import { RouterOutlet } from '@angular/router';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'dc-dashboard',
  imports: [Header, RouterOutlet, Footer],
  host: {
    class: 'block p-4 md:p-12 min-h-screen text-white',
  },
  template: `
    <dc-header />
    <router-outlet />
    <dc-footer />
  `,
})
export class Dashboard {}
