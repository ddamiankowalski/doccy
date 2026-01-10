import { Component, inject, signal } from '@angular/core';
import { Spinner } from '../../../../ui/loader/components/spinner/spinner';
import { PrimaryButton } from '../../../../ui/button/primary-button/primary-button';
import { SecondaryButton } from '../../../../ui/button/secondary-button/secondary-button';
import { Modal } from '../../../../ui/overlay/components/modal';
import { EntryFields, FinanceStore, SectionName } from '../../store/finance.store';
import { Disclaimer } from '../../../../ui/components/disclaimer/disclaimer';
import { InputForm } from '../../../../ui/input/input-form/input-form';
import { TranslatePipe } from '@ngx-translate/core';
import { UpperCasePipe } from '@angular/common';
import { catchError, EMPTY } from 'rxjs';

@Component({
  selector: 'dc-finance-add-entry',
  host: {
    class: 'min-w-[30rem]',
  },
  imports: [
    Spinner,
    PrimaryButton,
    SecondaryButton,
    Disclaimer,
    InputForm,
    TranslatePipe,
    UpperCasePipe,
  ],
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

      @if (formElement.form) {
        <div class="flex gap-2">
          @let state = formElement.form();

          <dc-secondary-button (clicked)="onCancelClick()" class="flex-1"
            >Cancel</dc-secondary-button
          >
          <dc-primary-button
            (clicked)="onAddClick()"
            [isDisabled]="state.invalid()"
            [isLoading]="isAdding()"
            class="flex-1"
            >{{ 'ADD_' + this.name | uppercase | translate }}</dc-primary-button
          >
        </div>
      }
    }
  `,
})
export class FinanceAddEntry {
  public modal = inject(Modal);
  public finance = inject(FinanceStore);

  public model = signal({});
  public isAdding = signal<boolean>(false);
  public fields = signal<EntryFields>({
    error: false,
    loading: true,
    metadata: [],
  });

  constructor() {
    this._fetchFields();
  }

  get name(): SectionName {
    const { name } = this.modal.data();
    return name;
  }

  private _fetchFields(): void {
    const { name } = this.modal.data();
    this.fields.set({
      metadata: [],
      error: false,
      loading: true,
    });

    this.finance
      .fetchFields$(name)
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

  public onCancelClick(): void {
    this.modal.close();
  }

  public onAddClick(): void {
    this.finance.addEntry$(this.name, this.model()).subscribe(() => {
      this.modal.close();
    });
  }
}
