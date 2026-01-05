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
    class: `relative mt-auto bg-charcoal-light
        h-[2.125rem]
        cursor-pointer
        w-full
        border border-white/50
        rounded-md
        px-3 py-2
        text-xs
        text-white/50
        transition`,
    '[class.outline-none]': 'isOpen()',
    '[class.ring-3]': 'isOpen()',
    '[class.ring-offset-1]': 'isOpen()',
    '[class.text-white]': 'isOpen()',
    '[class.ring-white/20]': 'isOpen()',
  },
  template: `
    <span>{{ placeholder() }}</span>

    <ul
      class="absolute inset-x-0 top-full mt-2 px-3 py-2 bg-charcoal-light flex flex-col gap-2 rounded-md border border-white/10"
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
