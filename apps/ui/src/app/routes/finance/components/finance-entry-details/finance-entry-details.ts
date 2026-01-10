import { Component, ViewEncapsulation } from '@angular/core';
import { PrimaryButton } from '../../../../ui/button/primary-button/primary-button';
import { LucideAngularModule } from 'lucide-angular';
import { SecondaryButton } from '../../../../ui/button/secondary-button/secondary-button';
import { Table } from '../../../../ui/table/components/table';

@Component({
  selector: 'dc-finance-entry-details',
  encapsulation: ViewEncapsulation.None,
  imports: [PrimaryButton, SecondaryButton, LucideAngularModule, Table],
  template: `
    <div class="w-full text-xs">
      <div class="flex gap-2 mb-2">
        <dc-primary-button icon="plus"> Add new </dc-primary-button>
        <dc-secondary-button icon="plus" [isDisabled]="true"> Remove selected </dc-secondary-button>
      </div>

      <dc-table/>
    </div>
  `,
})
export class FinanceEntryDetails {

}
