import { Component, inject, input, output, signal } from '@angular/core';
import { Modal } from '../../../../ui/overlay/components/modal';
import { SecondaryButton } from '../../../../ui/button/secondary-button/secondary-button';
import { PrimaryButton } from '../../../../ui/button/primary-button/primary-button';
import { booleanAttribute } from '@angular/core';
import { FinanceFields, FinanceStore } from '../../store/finance.store';
import { catchError, EMPTY } from 'rxjs';

@Component({
  selector: 'dc-finance-add',
  imports: [SecondaryButton, PrimaryButton],
  template: `
    <div class="flex gap-2">
      <dc-secondary-button class="flex-1" (clicked)="onBackClick()">Cancel</dc-secondary-button>
      <dc-primary-button class="flex-1" (clicked)="onSaveClick()">Save</dc-primary-button>
    </div>
  `,
})
export class FinanceAdd {
  public modal = inject(Modal);
  public finance = inject(FinanceStore);

  public goBack = output();
  public emitGoBack = input(false, { transform: booleanAttribute });

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
    if (this.emitGoBack()) {
      this.goBack.emit();
      return;
    }

    const ref = this.modal.ref();
    ref.destroy();
  }

  public onSaveClick(): void {
    console.log('save!');
  }

  private _fetchFields(): void {
    const { name } = this.modal.data();

    this.finance
      .fetchEntryFields$(name)
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

  private _setHeader(): void {
    const ref = this.modal.ref();
    const { name } = this.modal.data();

    ref.setInput('title', 'ENTRY_ADD_' + name.toUpperCase());
    ref.setInput('description', `ENTRY_ADD_${name.toUpperCase()}_DESCRIPTION`);
  }
}
