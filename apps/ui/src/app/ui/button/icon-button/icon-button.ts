import { NgClass } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

type IconButtonType = 'normal' | 'error';

@Component({
  selector: 'dc-icon-button',
  host: {
    class: 'contents',
  },
  imports: [LucideAngularModule, NgClass],
  template: `
    <button
      class="flex cursor-pointer w-7 h-7 items-center justify-center p-1.5  rounded-md transition-all"
      [ngClass]="[textClass()]"
      (click)="clicked.emit()"
    >
      <lucide-icon class="w-3.5 h-3.5" [name]="name()" />
    </button>
  `,
})
export class IconButton {
  public clicked = output<void>();

  /**
   * Name of the icon
   */
  public name = input.required<string>();

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
