import { Component, HostListener, input, model, signal } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';

export type SelectOption = {
  value: string;
  label: string;
};

@Component({
  selector: 'dc-input-select',
  host: {
    class: `relative mt-auto bg-charcoal-light
        h-[2.125rem]
        cursor-pointer
        w-full
        border border-white/50
        rounded-md
        px-3 py-2
        text-white/50
        hover:text-white
        text-xs
        transition`,
    '[class.outline-none]': 'isOpen()',
    '[class.ring-3]': 'isOpen()',
    '[class.ring-offset-1]': 'isOpen()',
    '[class.text-white]': 'isOpen()',
    '[class.ring-white/20]': 'isOpen()',
  },
  template: `
    <ul
      class="absolute inset-x-0 top-full mt-2 px-3 py-2 flex flex-col gap-2 rounded-md bg-charcoal-light border border-white/50"
      [class.hidden]="isOpen() === false"
    >
      @for(option of options(); track option.value) {
      <li>{{ option.label }}</li>
      }
    </ul>
  `,
})
export class InputSelect implements FormValueControl<string> {
  @HostListener('click')
  public onClick(): void {
    this.isOpen.update((isOpen) => !isOpen);
  }

  public value = model<string>('');

  public options = input<SelectOption[]>([]);

  public isOpen = signal<boolean>(false);
}
