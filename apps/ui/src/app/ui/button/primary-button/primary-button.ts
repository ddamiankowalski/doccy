import { NgClass } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'dc-primary-button',
  template: `
    <button
      (click)="onClick()"
      [disabled]="isDisabled()"
      [ngClass]="[bgClass(), cursorClass(), textClass()]"
      class="flex w-full items-center justify-center rounded-md transition-colors text-xs font-medium py-2 px-4"
    >
      @if (isLoading()) {
        <lucide-icon
          animate.enter="fade-in"
          animate.leave="fade-out"
          class="w-3.5 h-3.5 mr-1 animate-spin"
          name="loader-circle"
        />
      } @else if (icon(); as icon) {
        <lucide-icon
          animate.enter="fade-in"
          animate.leave="fade-out"
          class="w-3.5 h-3.5 mr-1"
          [name]="icon"
        />
      }
      <ng-content />
    </button>
  `,
  imports: [NgClass, LucideAngularModule],
})
export class PrimaryButton {
  public clicked = output<void>();

  public bgClass = computed(() => {
    return this.isDisabled() || this.isLoading()
      ? 'bg-white/40'
      : 'bg-white/90 hover:bg-white active:bg-white/90';
  });

  public cursorClass = computed(() => {
    return this.isDisabled() || this.isLoading() ? 'cursor-auto' : 'cursor-pointer';
  });

  public textClass = computed(() => {
    return this.isDisabled() || this.isLoading() ? 'text-charcoal/70' : 'text-charcoal';
  });

  public isDisabled = input<boolean>(false);
  public isLoading = input<boolean>(false);
  public icon = input<string | null>(null);

  public onClick(): void {
    if (this.isDisabled()) {
      return;
    }

    this.clicked.emit();
  }
}
