import { Component, input } from '@angular/core';
import { ProgressBar } from '../../../../../ui/components/progress-bar/progress-bar';
import { FinanceEntry } from '../../../store/finance.store';
import { KeyValuePipe } from '@angular/common';

@Component({
  selector: 'dc-finance-tile-footer',
  imports: [ProgressBar, KeyValuePipe],
  template: ` @for (item of entry() | keyvalue; track item.key) {
    @if (item.value !== undefined) {
      @switch (item.key) {
        @case ('houseDownPayment') {
          <dc-progress-bar class="mt-auto" [value]="65" description="House down payment" />
        }

        @case ('retirementFund') {
          <dc-progress-bar class="mt-auto" [value]="65" description="House down payment" />
        }
      }
    }
  }`,
})
export class FinanceTileFooter {
  public entry = input.required<FinanceEntry>();
}
