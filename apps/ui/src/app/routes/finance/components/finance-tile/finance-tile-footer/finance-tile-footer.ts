import { Component, input } from '@angular/core';
import { ProgressBar } from '../../../../../ui/components/progress-bar/progress-bar';
import { FinanceEntry } from '../../../store/finance.store';

@Component({
  selector: 'dc-finance-tile-footer',
  host: {
    class: '',
  },
  imports: [ProgressBar],
  template: `
    @let entryInfo = entry();
    @if (entryInfo.profit !== undefined) {
      @let profit = entryInfo.profit;

      <div class="flex justify-between gap-4 pt-4 border-t border-white/5">
        @if (profit === null) {
          <span class="text-sm font-normal text-gray-400">No summary available</span>
        } @else {
          <div class="flex flex-col">
            <div class="text-xs text-gray-500 mb-1">Day change</div>
            <span class="text-sm font-medium text-emerald-400">+1250 zł</span>
          </div>

          <div class="flex flex-col">
            <div class="text-xs text-gray-500 mb-1">Total profit</div>
            <span class="text-sm font-medium text-emerald-400">+2250 zł</span>
          </div>
        }
      </div>
    } @else {
      <dc-progress-bar class="mt-auto" [value]="65" description="House down payment" />
    }
  `,
})
export class FinanceTileFooter {
  public entry = input.required<FinanceEntry>();
}
