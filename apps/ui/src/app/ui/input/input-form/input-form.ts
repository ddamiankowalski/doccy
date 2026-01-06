import { Component, input } from '@angular/core';
import { InputText } from '../input-text/input-text';
import { InputNumber } from '../input-number/input-number';
import { InputSelect } from '../input-select/input-select';
import { InputField } from './type';

@Component({
  selector: 'dc-input-form',
  imports: [InputText, InputNumber, InputSelect],
  template: `
    <form class="grid gap-4 grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] max-w-[calc(2*1fr)]">
      @for (field of fields(); track field.id) {
        @switch (field.type) {
          @case ('text') {
            <dc-input-text [placeholder]="field.placeholder" [label]="field.label" [inputId]="field.id" />
          }
          @case ('number') {
            <dc-input-number [placeholder]="field.placeholder" [label]="field.label" [inputId]="field.id" />
          }
          @case ('select') {
            @if (field.options) {
            <dc-input-select [placeholder]="field.placeholder" [options]="field.options" [label]="field.label" [inputId]="field.id" />
            }
          }
        }
      }
    </form>
  `,
})
export class InputForm {
  public fields = input.required<InputField[]>();
}
