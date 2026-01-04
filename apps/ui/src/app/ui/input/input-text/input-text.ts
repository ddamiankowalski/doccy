import { Component, ElementRef, input, model, viewChild } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';

@Component({
  selector: 'dc-input-text',
  host: {
    class: 'block h-full w-full relative',
  },
  template: `
    <input
      #inputEl
      [id]="id()"
      [value]="value()"
      placeholder="This is some placeholder"
      (input)="onInput()"
      class="bg-charcoal-light
        w-full
        border border-white/50 
        rounded-md
        px-3 py-2 
        text-white/50
        hover:text-white
        text-sm
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

  public id = input<string>();
  public label = input<string>();

  public onInput(): void {
    const input = this._input();
    this.value.set(input.nativeElement.value);
  }
}
