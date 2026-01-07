import { Component, inject, signal, viewChild } from '@angular/core';
import { Spinner } from '../../../../ui/loader/components/spinner/spinner';
import { PrimaryButton } from '../../../../ui/button/primary-button/primary-button';
import { SecondaryButton } from '../../../../ui/button/secondary-button/secondary-button';
import { Modal } from '../../../../ui/overlay/components/modal';
import { FinanceStore } from '../../store/finance.store';
import { Disclaimer } from '../../../../ui/components/disclaimer/disclaimer';
import { InputForm } from '../../../../ui/input/input-form/input-form';
import { Events } from '@ngrx/signals/events';
import { added } from '../../store/finance.events';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
    <dc-input-form #formElement [metadata]="fields.metadata" [(model)]="model" />

    @if(formElement.form) {
    <div class="flex gap-2">
      @let state = formElement.form();

      <dc-secondary-button (clicked)="onCancelClick()" class="flex-1">Cancel</dc-secondary-button>
      <dc-primary-button
        (clicked)="onAddClick()"
        [isDisabled]="state.invalid()"
        [isLoading]="this.finance.assets.createLoading()"
        class="flex-1"
        >Add asset</dc-primary-button
      >
    </div>
    } }
  `,
})
export class FinanceAdd {
  public modal = inject(Modal);

  public finance = inject(FinanceStore);
  public model = signal({});

  private _events = inject(Events);

  constructor() {
    this.finance.fetchFields('assets');

    this._events
      .on(added)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.modal.close());
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

  public onAddClick(): void {
    this.finance.addAsset(this.model());
  }
}
