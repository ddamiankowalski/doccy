import { Component, ElementRef, input, model, viewChild } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'dc-input-text',
  host: {
    class: 'flex flex-col h-full w-full relative gap-2',
  },
  imports: [TranslatePipe],
  template: `
    @if (label() | translate) {
      <label class="text-white text-xs leading-none" [for]="inputId()">{{ label() }}</label>
    }

    <input
      #inputEl
      [id]="inputId()"
      [value]="value()"
      [placeholder]="placeholder()"
      (input)="onInput()"
      autocomplete="off"
      type="text"
      class="bg-charcoal-light
        w-full
        h-8.5
        border border-white/50
        rounded-md
        px-3 py-2
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
    />
  `,
})
export class InputText implements FormValueControl<string> {
  private _input = viewChild.required<ElementRef>('inputEl');

  public value = model<string>('');

  public inputId = input.required<string>();
  public label = input<string>();
  public placeholder = input<string>('');

  public onInput(): void {
    const input = this._input();
    this.value.set(input.nativeElement.value);
  }
}
