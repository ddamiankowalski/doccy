import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'dc-dashboard',
  host: {
    class: 'block p-12 min-h-screen text-white',
  },
  template: `i am finance`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Finance {}
