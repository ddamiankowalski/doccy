import { Component } from '@angular/core';

@Component({
  selector: 'dc-secondary-button',
  template: `
    <button
      class="flex w-full items-center justify-center cursor-pointer rounded-md bg-white/5  hover:bg-white/10 transition-colors active:bg-white/15 text-xs font-medium text-white/80 py-2 px-4"
    >
      <ng-content />
    </button>
  `,
})
export class SecondaryButton {}
