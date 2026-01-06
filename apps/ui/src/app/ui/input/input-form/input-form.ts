import { Component, effect, input, model, OnInit } from '@angular/core';
import { InputText } from '../input-text/input-text';
import { InputNumber } from '../input-number/input-number';
import { InputSelect } from '../input-select/input-select';
import { FormModel, InputField } from './type';
import { InputConditionPipe } from './pipes/input-form-condition.pipe';
import { form, Field } from '@angular/forms/signals';

@Component({
  selector: '<dc-input-form>',
  imports: [InputText, InputNumber, InputSelect, InputConditionPipe, Field],
  template: `
    <form class="grid gap-4 grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] max-w-[calc(2*1fr)]">
      @for (field of metadata(); track field.id) {
        @let value = form().value();
        @let condition = field | condition : metadata() : value;

        @if(condition) {
          @switch (field.type) {
          @case ('text') {
            <dc-input-text [field]="form[field.id]" [placeholder]="field.placeholder" [label]="field.label" [inputId]="field.id" />
          }
          @case ('number') {
            <dc-input-number [field]="form[field.id]" [placeholder]="field.placeholder" [label]="field.label" [inputId]="field.id" />
          }
          @case ('select') {
            @if (field.options) {
            <dc-input-select [field]="form[field.id]" [placeholder]="field.placeholder" [options]="field.options" [label]="field.label" [inputId]="field.id" />
            }
          }
        }
        }
      }
    </form>
  `,
})
export class InputForm implements OnInit {
  public metadata = input.required<InputField[]>();
  
  public model = model<Record<string, any | null>>({});
  public form = form(this.model);

  constructor() {
    effect(() => {
      console.log(this.form().value())
    })
  
  }

  public ngOnInit(): void {
    const model = this._buildModel();
    this.model.set(model);
  }

  private _buildModel(): FormModel {
    const metadata = this.metadata();
    return metadata.reduce((model, field) => ({ ...model, [field.id]: null }), {});
  }
}
