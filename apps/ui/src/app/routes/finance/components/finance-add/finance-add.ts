import { Component, inject, input, output, signal } from '@angular/core';
import { Modal } from '../../../../ui/overlay/components/modal';
import { SecondaryButton } from '../../../../ui/button/secondary-button/secondary-button';
import { PrimaryButton } from '../../../../ui/button/primary-button/primary-button';
import { booleanAttribute } from '@angular/core';
import { FinanceFields, FinanceStore } from '../../store/finance.store';
import { catchError, EMPTY } from 'rxjs';
import { InputForm } from '../../../../ui/input/input-form/input-form';
import { Disclaimer } from '../../../../ui/components/disclaimer/disclaimer';
import { Spinner } from '../../../../ui/loader/components/spinner/spinner';

@Component({
  selector: 'dc-finance-add',
  imports: [SecondaryButton, PrimaryButton, InputForm, Disclaimer, Spinner],
  template: `
    @let loading = fields().loading;
    @let error = fields().error;
    @let metadata = fields().metadata;

    @if (loading) {
      <dc-spinner class="p-8" />
    } @else if (error || metadata.length === 0) {
      <dc-disclaimer
        class="my-12"
        icon="bug"
        title="Error occurred"
        description="Could not fetch fields for adding a new record"
      />
    } @else {
      <dc-input-form #formElement [metadata]="metadata" [(model)]="model" />
    }

    <div class="flex gap-2">
      <dc-secondary-button class="flex-1" (clicked)="onBackClick()">Cancel</dc-secondary-button>
      <dc-primary-button class="flex-1" (clicked)="onSaveClick()" [isDisabled]="error"
        >Save</dc-primary-button
      >
    </div>
  `,
})
export class FinanceAdd {
  public modal = inject(Modal);
  public finance = inject(FinanceStore);

  public goBack = output();
  public emitGoBack = input(false, { transform: booleanAttribute });

  public model = signal<object>({});
  public fields = signal<FinanceFields>({
    error: false,
    loading: true,
    metadata: [],
  });

  constructor() {
    this._setHeader();
    this._fetchFields();
  }

  public onBackClick(): void {
    this._cancel();
  }

  public onSaveClick(): void {
    const { name, type } = this.modal.data();
    this.finance.addEntryRecord$(name, type, this.model()).subscribe(() => this._cancel());
  }

  private _fetchFields(): void {
    const { name, type } = this.modal.data();

    this.finance
      .fetchFields$(name, type)
      .pipe(
        catchError(() => {
          this.fields.set({
            metadata: [],
            error: true,
            loading: false,
          });

          return EMPTY;
        }),
      )
      .subscribe((metadata) =>
        this.fields.set({
          metadata,
          error: false,
          loading: false,
        }),
      );
  }

  private _cancel(): void {
    if (this.emitGoBack()) {
      this.goBack.emit();
      return;
    }

    const ref = this.modal.ref();
    ref.destroy();
  }

  private _setHeader(): void {
    const ref = this.modal.ref();
    const { name } = this.modal.data();

    ref.setInput('title', 'ENTRY_ADD_' + name.toUpperCase());
    ref.setInput('description', `ENTRY_ADD_${name.toUpperCase()}_DESCRIPTION`);
  }
}
