import { NgClass } from '@angular/common';
import { Component, computed, ElementRef, input, model, viewChild } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { TranslatePipe } from '@ngx-translate/core';

type InputNumberMode = 'currency' | 'normal';

@Component({
  selector: 'dc-input-number',
  host: {
    class: 'flex flex-col h-full w-full relative gap-2',
  },
  styles: [
    `
      input[type='number']::-webkit-inner-spin-button,
      input[type='number']::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      input[type='number'] {
        -moz-appearance: textfield;
      }
    `,
  ],
  imports: [NgClass, TranslatePipe],
  template: `
    @if (label()) {
      <label class="text-white text-xs leading-none" [for]="inputId()">{{ (label() | translate) + (required() ? '*':'') }}</label>
    }

    <div class="relative">
      @if (mode() === 'currency') {
        <div class="absolute text-xs mr-3 right-0 top-1/2  -translate-y-1/2 text-white/30">
          złotych
        </div>
      }

      <input
        #inputEl
        [id]="inputId()"
        [value]="value()"
        [placeholder]="placeholder()"
        (input)="onInput()"
        (blur)="onBlur()"
        type="number"
        autocomplete="off"
        class="bg-charcoal-light
        w-full
        h-8.5
        border border-white/50
        rounded-md
        py-2
        text-white
        hover:text-white
        text-xs
        placeholder:text-white/30
        focus:outline-none
        focus:ring-3
        focus:ring-offset-1
        focus:text-white
        focus:ring-white/20
        transition"
        [ngClass]="paddingClass()"
      />
    </div>
  `,
})
export class InputNumber implements FormValueControl<number | null> {
  private _input = viewChild.required<ElementRef>('inputEl');

  public value = model<number | null>(null);
  public required = input<boolean>(false);

  public inputId = input.required<string>();
  public label = input<string>();
  
  public touched = model<boolean>(false);
  public placeholder = input<string>();

  public paddingClass = computed<string>(() => {
    const mode = this.mode();

    if (mode === 'currency') {
      return 'pl-3 pr-16';
    }

    return 'px-3';
  });

  public mode = input<InputNumberMode>('normal');

  public onInput(): void {
    const input = this._input();
    this.value.set(input.nativeElement.value);
  }

  public onBlur(): void {
    this.touched.set(true);
  }
}
