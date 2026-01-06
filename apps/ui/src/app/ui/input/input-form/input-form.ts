import { Component, inject, Injector, input, model, OnInit, runInInjectionContext } from '@angular/core';
import { InputText } from '../input-text/input-text';
import { InputNumber } from '../input-number/input-number';
import { InputSelect } from '../input-select/input-select';
import { FormModel, InputField } from './type';
import { form, Field, FieldTree } from '@angular/forms/signals';
import { toSchema } from './utils/to-schema';
import { TranslatePipe } from '@ngx-translate/core';
import { LucideAngularModule } from "lucide-angular";

@Component({
  selector: 'dc-input-form',
  host: {
    class: 'relative block pb-6'
  },
  imports: [InputText, InputNumber, InputSelect, Field, TranslatePipe, LucideAngularModule],
  template: `
    @if(form) {
      <form class="grid gap-4 grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] max-w-[calc(2*1fr)]">
        @for (entry of metadata(); track entry.id) {
                @let field = form[entry.id];
                @let state = field();

                @let placeholder = entry.placeholder;
                @let label = entry.label;
                @let id = entry.id;
                @let mode = entry.mode;

                @if(!state.hidden()) {
                  @switch (entry.type) {
                    @case ('text') {
                      <dc-input-text [field]="field" [placeholder]="placeholder" [label]="label" [inputId]="id" />
                    }
                    @case ('number') {
                      <dc-input-number [field]="field" [placeholder]="placeholder" [label]="label" [inputId]="id" [mode]="mode" />
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

      @let state = form();

      @if(state.invalid() && (state.touched() || state.dirty())) {
        <span animate.enter="fade-in" animate.leave="fade-out" class="flex mt-4 text-[#ff6466] items-center gap-1 text-xs">
          <lucide-icon class="w-3 h-3" name="triangle-alert" />
          {{ 'REQUIRED_FIELDS_ERROR' | translate }}</span>
      }
    }
  `,
})
export class InputForm implements OnInit {
  public metadata = input.required<InputField[]>();
  
  public model = model<Record<string, any | null>>({});
  public form: FieldTree<FormModel> | null = null;

  private _injector = inject(Injector);

  public ngOnInit(): void {
    runInInjectionContext(this._injector, () => this._initializeForm())
  }

  private _initializeForm(): void {
    const metadata = this.metadata();

    this.model.set(metadata.reduce((model, field) => ({ ...model, [field.id]: null }), {}))
    this.form = form(this.model, toSchema(metadata));
  }
}
