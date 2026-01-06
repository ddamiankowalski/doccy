import { Component, input } from '@angular/core';

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
  template: `
    <form class="grid gap-4 grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] max-w-[calc(2*1fr)]">
      @for(field of fields(); track field.id) { @switch(field.type) { @case ('text') { } } }
    </form>
  `,
})
export class InputForm {
  public fields = input.required<InputField[]>();
}
