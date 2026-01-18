import { Component, input } from '@angular/core';
import { FinanceEntry } from '../../../store/finance.store';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'dc-finance-tile-display',
  imports: [LucideAngularModule],
  template: `
    @let title = entry().name;
    @let value = entry().value;

    <h3 class="text-gray-400 text-sm font-medium mb-1">{{ title }}</h3>

    @if (value !== null) {
      <div class="text-2xl font-semibold text-white tracking-tight mb-4">{{ value }} zł</div>
    } @else {
      <div class="text-base font-medium text-white tracking-tight mb-4">No items added</div>
    }
  `,
})
export class FinanceTileDisplay {
  public entry = input.required<FinanceEntry>();
}
