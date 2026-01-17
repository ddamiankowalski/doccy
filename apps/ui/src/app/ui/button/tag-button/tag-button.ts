import { NgClass } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

type IconButtonType = 'normal' | 'error';

@Component({
  selector: 'dc-tag-button',
  host: {
    class: 'contents',
  },
  imports: [LucideAngularModule, NgClass],
  template: `
    <button
      class="flex text-xs font-medium text-nowrap cursor-pointer h-6 px-2 items-center justify-center rounded-md transition-all"
      [ngClass]="[textClass()]"
      (click)="clicked.emit()"
    >
      <div class="flex text-xs gap-1 items-center">
        <ng-content />
      </div>
    </button>
  `,
})
export class TagButton {
  public clicked = output<void>();

  public type = input<IconButtonType>('normal');

  public textClass = computed(() => {
    switch (this.type()) {
      case 'normal':
        return 'text-gray-500 hover:text-white hover:bg-white/10 active:bg-white/20';
      case 'error':
        return 'text-gray-500 hover:text-rose-400 hover:bg-rose-400/10 active:bg-rose-400/20';
    }
  });
}
