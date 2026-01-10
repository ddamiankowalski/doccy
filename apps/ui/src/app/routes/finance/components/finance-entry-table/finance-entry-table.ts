import { Component, output } from "@angular/core";
import { PrimaryButton } from "../../../../ui/button/primary-button/primary-button";
import { SecondaryButton } from "../../../../ui/button/secondary-button/secondary-button";
import { Table } from "../../../../ui/table/components/table";

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

  public onAddClick(): void {
    this.add.emit();
  }
}
