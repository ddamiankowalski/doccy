import { Component, inject, signal } from '@angular/core';
import { InputText } from '../../../../ui/input/input-text/input-text';
import { Spinner } from '../../../../ui/loader/components/spinner/spinner';
import { InputSelect } from '../../../../ui/input/input-select/input-select';
import { InputNumber } from '../../../../ui/input/input-number/input-number';
import { PrimaryButton } from '../../../../ui/button/primary-button/primary-button';
import { SecondaryButton } from '../../../../ui/button/secondary-button/secondary-button';
import { Modal } from '../../../../ui/overlay/components/modal';
import { FinanceStore } from '../../store/finance.store';
import { Disclaimer } from '../../../../ui/components/disclaimer/disclaimer';

@Component({
  selector: 'dc-finance-add',
  host: {
    class: 'min-w-[30rem]',
  },
  imports: [
    InputText,
    Spinner,
    InputSelect,
    InputNumber,
    PrimaryButton,
    SecondaryButton,
    Disclaimer,
  ],
  template: `
    @let fields = finance.assets.addFields(); @if(fields === 'loading') {
    <dc-spinner class="p-8" />
    } @else if(fields === 'error' || fields.length === 0) {
    <dc-disclaimer
      class="my-12"
      icon="bug"
      title="Error occurred"
      description="Could not fetch fields for adding a new record"
    />
    } @else {
    <fieldset class="grid gap-4 grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] max-w-[calc(2*1fr)]">
      @for(field of fields; track field) { @switch(field.type) { @case ('text') {
      <dc-input-text inputId="test" label="First name" placeholder="Enter first name" />
      } @case('number') {
      <dc-input-number
        inputId="idk"
        mode="currency"
        label="Enter value"
        placeholder="Enter the value"
      />
      } @case ('select') {
      <dc-input-select
        inputId="select"
        label="Select an option"
        placeholder="Select your option"
        [options]="options"
      />
      } } }
    </fieldset>

    <div class="flex gap-2">
      <dc-secondary-button (clicked)="onCancelClick()" class="flex-1 block mt-8"
        >Cancel</dc-secondary-button
      >
      <dc-primary-button class="flex-1 block mt-8">Add asset</dc-primary-button>
    </div>
    }
  `,
})
export class FinanceAdd {
  public isLoading = signal(true);
  public modal = inject(Modal);

  public finance = inject(FinanceStore);

  constructor() {
    this.finance.fetchFields('assets');
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

  public onCancelClick(): void {
    this.modal.close();
  }
}
