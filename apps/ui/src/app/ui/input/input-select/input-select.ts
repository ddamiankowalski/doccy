import { NgClass } from '@angular/common';
import {
  Component,
  computed,
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
import { LucideAngularModule } from 'lucide-angular';
import { filter, fromEvent } from 'rxjs';

export type SelectOption = {
  value: string;
  label: string;
};

@Component({
  selector: 'dc-input-select',
  imports: [NgClass, LucideAngularModule],
  host: {
    class: `flex flex-col h-full w-full relative gap-2`,
  },
  template: `
    @if(label()) {
    <label [for]="inputId()" class="text-white text-xs leading-none">{{ label() }}</label>
    }

    <div
      tabindex="0"
      [id]="inputId()"
      class="flex
        justify-between
        items-center
        group/select relative mt-auto bg-charcoal-light
        h-8.5
        cursor-pointer
        w-full
        border border-white/50
        rounded-md
        px-1 py-2
        text-xs
        text-white/50
        focus:outline-none
        focus:ring-3
        focus:ring-offset-1
        focus:text-white
        focus:ring-white/20
        transition"
    >
      <span
        [ngClass]="value() !== null ? 'text-white' : 'text-white/30'"
        class="ml-2 group-focus-within/select:text-white"
        >@if(optionLabel() === null) {
        {{ placeholder() }}
        } @else {
        {{ optionLabel() }}
        }</span
      >

      @if(value() !== null) {
      <div
        (click)="onResetClick()"
        class="transition-all flex justify-center items-center rounded-full hover:bg-white/10 h-6 w-6"
      >
        <lucide-icon class="h-4 w-4" name="x" />
      </div>
      }

      <ul
        class="absolute inset-x-0 top-full mt-2 p-1 bg-charcoal-light flex flex-col gap-2 rounded-md border border-white/10"
        [class.hidden]="isOpen() === false"
      >
        @for(option of options(); track option.value) {
        <li
          (click)="onOptionClick(option.value)"
          class="flex justify-between items-center transition-all p-2 rounded-sm hover:bg-white/10"
        >
          {{ option.label }}

          @if(option.value === value()) {
          <lucide-icon class="h-4 w-4" name="check" />
          }
        </li>
        }
      </ul>
    </div>
  `,
})
export class InputSelect implements FormValueControl<string | null> {
  @HostListener('click')
  public onClick(): void {
    this.isOpen.update((isOpen) => !isOpen);
  }

  private _document = inject(DOCUMENT);
  private _elementRef = inject(ElementRef);

  public value = model<string | null>(null);
  public inputId = input.required<string>();

  public label = input<string>();
  public placeholder = input<string>();

  public options = input<SelectOption[]>([]);

  public isOpen = signal<boolean>(false);

  public optionLabel = computed(() => {
    const option = this.options().find(({ value }) => value === this.value());

    if (!option) {
      return null;
    }

    return option.label;
  });

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

  public onOptionClick(value: string): void {
    this.value.set(value);
  }

  public onResetClick(): void {
    this.value.set(null);
  }
}
