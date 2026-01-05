import { Component } from '@angular/core';

@Component({
  selector: 'dc-primary-button',
  template: `
    <button
      class="flex w-full items-center justify-center cursor-pointer rounded-md bg-white/90 hover:bg-white transition-colors active:bg-white/90 text-xs font-medium text-charcoal py-2 px-4"
    >
      <ng-content />
    </button>
  `,
})
export class PrimaryButton {}
