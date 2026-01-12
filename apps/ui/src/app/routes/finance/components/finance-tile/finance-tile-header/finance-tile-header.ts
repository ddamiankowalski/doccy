import { Component, computed, input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { FinanceEntry, SectionName } from '../../../store/finance.store';
import { FinanceTileHeaderActions } from '../finance-tile-header-actions/finance-tile-header-actions';

@Component({
  selector: 'dc-finance-tile-header',
  imports: [LucideAngularModule, FinanceTileHeaderActions],
  template: ` <div class="flex justify-between items-start mb-4">
    <div
      class="flex justify-center items-center min-w-9 min-h-9 p-2 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors"
    >
      <lucide-icon class="h-5 w-5" [name]="icon()"></lucide-icon>
    </div>

    <div class="flex ml-2 gap-2 items-center">
      @switch (name()) {
        @default {
          <dc-finance-tile-header-actions [entry]="entry()" />
        }
      }

      <div
        class="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full text-emerald-400 bg-emerald-400/10"
      >
        <lucide-icon class="self-center h-3 w-3" name="trending-up"></lucide-icon>
        1.25%
      </div>
    </div>
  </div>`,
})
export class FinanceTileHeader {
  public name = input.required<SectionName>();
  public entry = input.required<FinanceEntry>();

  public icon = computed<string>(() => {
    return '';
  });
}
