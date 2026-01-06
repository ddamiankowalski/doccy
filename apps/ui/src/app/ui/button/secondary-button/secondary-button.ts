import { NgClass } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'dc-secondary-button',
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
export class SecondaryButton {
  public clicked = output();
  public isDisabled = input<boolean>(false);

  public bgClass = computed(() => {
    return this.isDisabled() ? 'transparent' : 'bg-white/5  hover:bg-white/10 active:bg-white/15';
  });

  public cursorClass = computed(() => {
    return this.isDisabled() ? 'cursor-auto' : 'cursor-pointer';
  });

  public textClass = computed(() => {
    return this.isDisabled() ? 'text-white/30' : 'text-white/80';
  });

  public onClick(): void {
    if (this.isDisabled()) {
      return;
    }

    this.clicked.emit();
  }
}
