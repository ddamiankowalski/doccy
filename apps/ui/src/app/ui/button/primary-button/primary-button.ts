import { Component } from '@angular/core';

@Component({
  selector: 'dc-primary-button',
  template: `
    <button class="flex items-center justify-center rounded-md bg-white text-md text-charcoal">
      <ng-content />
    </button>
  `,
})
export class PrimaryButton {}
