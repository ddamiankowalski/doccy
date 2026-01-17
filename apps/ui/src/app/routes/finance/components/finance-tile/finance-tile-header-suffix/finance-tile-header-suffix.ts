import { Component, input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { FinanceEntry } from '../../../store/finance.store';

@Component({
  selector: 'dc-finance-tile-header-suffix',
  imports: [LucideAngularModule],
  template: `
    @let entryInfo = entry();

    @if (entryInfo.profit) {
      <div
        class="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full text-emerald-400 bg-emerald-400/10"
      >
        <lucide-icon class="self-center h-3 w-3" name="trending-up"></lucide-icon>
        1.25%
      </div>
    }
  `,
})
export class FinanceTileHeaderSuffix {
  public entry = input.required<FinanceEntry>();
}
