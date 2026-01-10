import { Component, input, output } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'dc-icon-button',
  host: {
    class: 'contents',
  },
  imports: [LucideAngularModule],
  template: `
    <button
      class="flex items-center justify-center p-1.5 text-gray-500 hover:text-white hover:bg-white/10 rounded-md transition-all"
      (click)="clicked.emit()"
    >
      <lucide-icon class="w-1.5 h-1.5" [name]="name()" />
    </button>
  `,
})
export class IconButton {
  public clicked = output<void>();

  /**
   * Name of the icon
   */
  public name = input.required<string>();
}
