import { Component, input } from '@angular/core';
import { FinanceEntry } from '../../../store/finance.store';
import { LucideAngularModule } from 'lucide-angular';
import { NgClass } from '@angular/common';

@Component({
  selector: 'dc-finance-tile-header-suffix',
  imports: [LucideAngularModule, NgClass],
  template: `
    @let entryInfo = entry();

    @if (entryInfo.profit !== undefined) {
      @let profit = entryInfo.profit;

      <div
        class="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full"
        [ngClass]="{
          'text-emerald-400 bg-emerald-400/10': profit !== null && profit > 0,
          'text-rose-400 bg-rose-400/10': profit !== null && profit < 0,
          'text-gray-400 bg-gray-400/10': profit === null,
        }"
      >
        @if (profit === null) {
          No data
        } @else if (profit >= 0) {
          <lucide-icon class="h-3 w-3" name="trending-up"></lucide-icon>
          {{ profit }}%
        } @else {
          <lucide-icon class="h-3 w-3" name="trending-down"></lucide-icon>
          {{ profit }}%
        }
      </div>
    }
  `,
})
export class FinanceTileHeaderSuffix {
  public entry = input.required<FinanceEntry>();
}
