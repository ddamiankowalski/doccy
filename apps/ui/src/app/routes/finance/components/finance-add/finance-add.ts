import { Component, signal } from '@angular/core';
import { InputText } from '../../../../ui/input/input-text/input-text';
import { Spinner } from '../../../../ui/loader/components/spinner/spinner';
import { InputSelect } from '../../../../ui/input/input-select/input-select';

@Component({
  selector: 'dc-finance-add',
  host: {
    class: 'min-w-[30rem]',
  },
  imports: [InputText, Spinner, InputSelect],
  template: `
    @if(isLoading()) {
    <dc-spinner class="p-4" />
    } @else {
    <fieldset class="grid gap-4 grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] max-w-[calc(2*1fr)]">
      <dc-input-text id="test" label="First name" placeholder="Enter first name" />
      <dc-input-text id="sometest" label="Last name" placeholder="Enter last name" />
      <dc-input-text id="another" label="Asset value" placeholder="Enter value" />
      <dc-input-select placeholder="Select your option" [options]="options" />
    </fieldset>
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
  ];
}
