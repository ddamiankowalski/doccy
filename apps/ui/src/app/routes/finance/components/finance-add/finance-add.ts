import { Component, signal } from '@angular/core';
import { InputText } from '../../../../ui/input/input-text/input-text';
import { Spinner } from '../../../../ui/loader/components/spinner/spinner';
import { InputSelect } from '../../../../ui/input/input-select/input-select';
import { InputNumber } from '../../../../ui/input/input-number/input-number';
import { PrimaryButton } from '../../../../ui/button/primary-button/primary-button';

@Component({
  selector: 'dc-finance-add',
  host: {
    class: 'min-w-[30rem]',
  },
  imports: [InputText, Spinner, InputSelect, InputNumber, PrimaryButton],
  template: `
    @if(isLoading()) {
    <dc-spinner class="p-8" />
    } @else {
    <fieldset class="grid gap-4 grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] max-w-[calc(2*1fr)]">
      <dc-input-text id="test" label="First name" placeholder="Enter first name" />
      <dc-input-text id="sometest" label="Last name" placeholder="Enter last name" />
      <dc-input-number id="idk" mode="currency" label="Enter value" placeholder="Enter the value" />
      <dc-input-select
        label="Select an option"
        placeholder="Select your option"
        [options]="options"
      />
    </fieldset>

    <dc-primary-button class="block mt-8">Add asset</dc-primary-button>

    }
  `,
})
export class FinanceAdd {
  public isLoading = signal(true);

  constructor() {
    setTimeout(() => {
      this.isLoading.set(false);
    }, 500);
  }

  public options = [
    {
      label: 'Some label',
      value: '1',
    },
    {
      label: 'Some label2',
      value: '2',
    },
    {
      label: 'Some label3',
      value: '3',
    },
  ];
}
