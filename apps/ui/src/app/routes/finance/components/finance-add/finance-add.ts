import { Component, inject, signal } from '@angular/core';
import { Spinner } from '../../../../ui/loader/components/spinner/spinner';
import { PrimaryButton } from '../../../../ui/button/primary-button/primary-button';
import { SecondaryButton } from '../../../../ui/button/secondary-button/secondary-button';
import { Modal } from '../../../../ui/overlay/components/modal';
import { FinanceStore } from '../../store/finance.store';
import { Disclaimer } from '../../../../ui/components/disclaimer/disclaimer';
import { InputForm } from '../../../../ui/input/input-form/input-form';

@Component({
  selector: 'dc-finance-add',
  host: {
    class: 'min-w-[30rem]',
  },
  imports: [Spinner, PrimaryButton, SecondaryButton, Disclaimer, InputForm],
  template: `
    @let fields = finance.assets.fields(); @if(fields.loading) {
    <dc-spinner class="p-8" />
    } @else if(fields.error || fields.metadata.length === 0) {
    <dc-disclaimer
      class="my-12"
      icon="bug"
      title="Error occurred"
      description="Could not fetch fields for adding a new record"
    />
    } @else {
    <dc-input-form #form [metadata]="fields.metadata" />

    {{ form.invalid() }}

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
