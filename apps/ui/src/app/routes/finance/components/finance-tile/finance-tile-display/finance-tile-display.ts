import { Component, input } from '@angular/core';
import { FinanceEntry } from '../../../store/finance.store';
import { TagButton } from '../../../../../ui/button/tag-button/tag-button';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'dc-finance-tile-display',
  imports: [TagButton, LucideAngularModule],
  template: `
    @let title = entry().name;
    @let value = entry().value;

    <h3 class="text-gray-400 text-sm font-medium mb-1">{{ title }}</h3>

    @if (value !== undefined) {
      <div class="text-2xl font-semibold text-white tracking-tight mb-4">{{ value }} zł</div>
    } @else {
      <div class="flex gap-2">
        <div class="text-base font-medium text-white tracking-tight mb-4">No stocks added</div>
        <dc-tag-button> Add stock</dc-tag-button>
      </div>
    }
  `,
})
export class FinanceTileDisplay {
  public entry = input.required<FinanceEntry>();
}
