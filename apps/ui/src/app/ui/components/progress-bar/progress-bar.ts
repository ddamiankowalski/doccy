import { Component, input } from '@angular/core';

@Component({
  selector: 'dc-progress-bar',
  imports: [],
  host: {
    class: 'flex flex-col gap-2',
  },
  template: ` <div class="flex justify-between text-xs text-gray-500">
      @if(description()) {
      <span>{{ description() }}</span>
      }

      <span>{{ value() + '%' }}</span>
    </div>

    <div class="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
      <div
        class="h-full bg-white rounded-full transition-all duration-500 ease-out"
        [style.width]="value() + '%'"
      ></div>
    </div>`,
})
export class ProgressBar {
  public value = input.required<number>();
  public description = input<string>();
}
