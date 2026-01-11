import { Component, inject, input, output } from '@angular/core';
import { Modal } from '../../../../ui/overlay/components/modal';
import { SecondaryButton } from '../../../../ui/button/secondary-button/secondary-button';
import { PrimaryButton } from '../../../../ui/button/primary-button/primary-button';
import { booleanAttribute } from '@angular/core';

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
  public goBack = output();

  public emitGoBack = input(false, { transform: booleanAttribute });

  constructor() {
    const ref = this.modal.ref();
    const { name } = this.modal.data();

    ref.setInput('title', 'ENTRY_ADD_' + name.toUpperCase());
    ref.setInput('description', `ENTRY_ADD_${name.toUpperCase()}_DESCRIPTION`);
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
}
