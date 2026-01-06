import { NgClass } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'dc-primary-button',
  template: `
    <button
      (click)="onClick()"
      [ngClass]="[bgClass(), cursorClass(), textClass()]"
      class="flex w-full items-center justify-center rounded-md transition-colors  text-xs font-medium py-2 px-4"
    >
      <ng-content />
    </button>
  `,
  imports: [NgClass],
})
export class PrimaryButton {
  public clicked = output<void>();

  public bgClass = computed(() => {
    return this.isDisabled() ? 'bg-white/40' : 'bg-white/90 hover:bg-white active:bg-white/90';
  });

  public cursorClass = computed(() => {
    return this.isDisabled() ? 'cursor-auto' : 'cursor-pointer';
  });

  public textClass = computed(() => {
    return this.isDisabled() ? 'text-charcoal/70' : 'text-charcoal';
  });

  public isDisabled = input<boolean>(false);

  public onClick(): void {
    if (this.isDisabled()) {
      return;
    }

    this.clicked.emit();
  }
}
