import {
  Component,
  DOCUMENT,
  ElementRef,
  HostListener,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormValueControl } from '@angular/forms/signals';
import { filter, fromEvent } from 'rxjs';

export type SelectOption = {
  value: string;
  label: string;
};

@Component({
  selector: 'dc-input-select',
  host: {
    tabindex: '0',
    class: `group/select relative mt-auto bg-charcoal-light
        h-[2.125rem]
        cursor-pointer
        w-full
        border border-white/50
        rounded-md
        px-3 py-2
        text-xs
        text-white/50
        focus:outline-none
        focus:ring-3
        focus:ring-offset-1
        focus:text-white
        focus:ring-white/20
        transition`,
  },
  template: `
    <span class="text-white/30 group-focus-within/select:text-white">{{ placeholder() }}</span>

    <ul
      class="absolute inset-x-0 top-full mt-2 p-1 bg-charcoal-light flex flex-col gap-2 rounded-md border border-white/10"
      [class.hidden]="isOpen() === false"
    >
      @for(option of options(); track option.value) {
      <li class="p-2 rounded-sm hover:bg-white/10">{{ option.label }}</li>
      }
    </ul>
  `,
})
export class InputSelect implements FormValueControl<string> {
  @HostListener('click')
  public onClick(): void {
    this.isOpen.update((isOpen) => !isOpen);
  }

  private _document = inject(DOCUMENT);
  private _elementRef = inject(ElementRef);

  public value = model<string>('');

  public placeholder = input<string>();

  public options = input<SelectOption[]>([]);

  public isOpen = signal<boolean>(false);

  constructor() {
    fromEvent(this._document.body, 'click')
      .pipe(
        takeUntilDestroyed(),
        filter(({ target }) => {
          const { nativeElement } = this._elementRef;
          return !nativeElement.contains(target);
        })
      )
      .subscribe((ev) => {
        ev.stopPropagation();
        this.isOpen.set(false);
      });
  }
}
