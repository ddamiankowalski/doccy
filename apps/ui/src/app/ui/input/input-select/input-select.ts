import { Component, HostListener, input, model, signal } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';

export type SelectOption = {
  value: string;
  label: string;
};

@Component({
  selector: 'dc-input-select',
  host: {
    class: `mt-auto bg-charcoal-light
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
  },
  template: `
    <ul class="flex flex-col gap-2" [class.hidden]="isOpen() === false">
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

  public readonly focusClass = 'outline-none ring-3 ring-offset-1 text-white ring-white/20';

  public value = model<string>('');

  public options = input<SelectOption[]>([]);

  public isOpen = signal<boolean>(false);
}
