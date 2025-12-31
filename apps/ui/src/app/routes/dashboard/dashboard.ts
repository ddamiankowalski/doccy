import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Header } from './components/header/header';

@Component({
  selector: 'dc-dashboard',
  imports: [Header],
  host: {
    class: 'block p-12 min-h-screen text-white',
  },
  template: ` <dc-header />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard {}
