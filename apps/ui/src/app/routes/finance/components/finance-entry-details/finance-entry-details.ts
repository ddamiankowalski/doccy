import { Component, signal, ViewEncapsulation } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { FinanceAdd } from '../finance-add/finance-add';
import { FinanceTable } from '../finance-entry-table/finance-entry-table';

@Component({
  selector: 'dc-finance-entry-details',
  encapsulation: ViewEncapsulation.None,
  imports: [ LucideAngularModule, FinanceAdd, FinanceTable],
  template: `
      @switch(tab()) {
        @case ('table') {
          <dc-finance-table (add)="onAddClick()" />
        } @case('add') {
          <dc-finance-add />
        }
      }
  `,
})
export class FinanceEntryDetails {
  public tab = signal<'add' | 'table'>('table');

  public onAddClick(): void {
    this.tab.set('add');
  }
}
