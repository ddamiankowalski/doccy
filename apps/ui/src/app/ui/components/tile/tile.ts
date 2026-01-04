import { Component } from '@angular/core';

@Component({
  selector: 'dc-tile',
  template: ` <ng-content /> `,
  imports: [],
  host: {
    class:
      'w-full h-full block bg-[#1a1a1a] border border-white/5 rounded-xl p-6 hover:border-white/10 transition-colors group ',
  },
})
export class Tile {}
