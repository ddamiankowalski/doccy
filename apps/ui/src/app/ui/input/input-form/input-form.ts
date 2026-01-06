import { Component, input } from '@angular/core';
import { InputText } from '../input-text/input-text';
import { InputNumber } from '../input-number/input-number';

export type InputType = 'text' | 'number' | 'select';

export type InputField = {
  id: string;
  type: InputType;
  required: boolean;
  label: string;
  placeholder: string;
};

@Component({
  selector: 'dc-input-form',
  imports: [InputText, InputNumber],
  template: `
    <form class="grid gap-4 grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] max-w-[calc(2*1fr)]">
      @for (field of fields(); track field.id) {
        @switch (field.type) {
          @case ('text') {
            <dc-input-text [label]="field.label" [inputId]="field.id" />
          }
          @case ('number') {
            <dc-input-number [label]="field.label" [inputId]="field.id" />
          }
        }
      }
    </form>
  `,
})
export class InputForm {
  public fields = input.required<InputField[]>();
}
