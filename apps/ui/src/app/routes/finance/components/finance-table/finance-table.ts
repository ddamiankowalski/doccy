import { Component, inject, output } from "@angular/core";
import { PrimaryButton } from "../../../../ui/button/primary-button/primary-button";
import { SecondaryButton } from "../../../../ui/button/secondary-button/secondary-button";
import { Table } from "../../../../ui/table/components/table";
import { Modal } from "../../../../ui/overlay/components/modal";

@Component({
  selector: 'dc-finance-table',
  imports: [PrimaryButton, SecondaryButton, Table],
  template: `
  <div class="flex gap-2 mb-2">
        <dc-primary-button (clicked)="onAddClick()" icon="plus"> Add new </dc-primary-button>
        <dc-secondary-button icon="plus" [isDisabled]="true"> Remove selected </dc-secondary-button>
      </div>

      <dc-table/>`
})
export class FinanceTable {
  public add = output<void>();
  public modal = inject(Modal);

  constructor() {
    const ref = this.modal.ref();
    const { name } = this.modal.data();

    ref.setInput('title', 'ENTRY_DETAILS_' + name.toUpperCase());
    ref.setInput('description', `ENTRY_DETAILS_${name.toUpperCase()}_DESCRIPTION`)
  }

  public onAddClick(): void {
    this.add.emit();
  }
}
