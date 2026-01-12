import { Component, input } from '@angular/core';
import { FinanceEntry } from '../../../store/finance.store';

@Component({
  selector: 'dc-finance-tile-display',
  template: ` @let title = entry().name;

    <h3 class="text-gray-400 text-sm font-medium mb-1">{{ title }}</h3>
    <div class="text-2xl font-semibold text-white tracking-tight mb-4">$850,000</div>`,
})
export class FinanceTileDisplay {
  public entry = input.required<FinanceEntry>();
}
