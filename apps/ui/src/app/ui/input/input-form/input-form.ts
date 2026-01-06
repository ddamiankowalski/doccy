import { Component, computed, effect, input, model, OnInit } from '@angular/core';
import { InputText } from '../input-text/input-text';
import { InputNumber } from '../input-number/input-number';
import { InputSelect } from '../input-select/input-select';
import { FormModel, InputField } from './type';
import { form, Field } from '@angular/forms/signals';
import { toSchema } from './utils/to-schema';
import { KeyValuePipe } from '@angular/common';

@Component({
  selector: '<dc-input-form>',
  imports: [InputText, InputNumber, InputSelect, Field],
  template: `
    <form class="grid gap-4 grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] max-w-[calc(2*1fr)]">
  @for (entry of metadata(); track entry.id) {
          @let field = form[entry.id];
          @let state = field();

          @let placeholder = entry.placeholder;
          @let label = entry.label;
          @let id = entry.id;

          @if(!state.hidden()) {
            @switch (entry.type) {
              @case ('text') {
                <dc-input-text [field]="field" [placeholder]="placeholder" [label]="label" [inputId]="id" />
              }
              @case ('number') {
                <dc-input-number [field]="field" [placeholder]="placeholder" [label]="label" [inputId]="id" />
              }
              @case ('select') {
                @let options = entry.options;
                
                @if (options) {
                  <dc-input-select [field]="field" [placeholder]="placeholder" [options]="options" [label]="label" [inputId]="id" />
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
  public form = form(this.model, toSchema);

  constructor() {
    effect(() => {
      console.log(this.form().value(), this.form())
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
