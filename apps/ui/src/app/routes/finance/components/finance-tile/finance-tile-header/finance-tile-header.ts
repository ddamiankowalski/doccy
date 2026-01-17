import { Component, computed, input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { FinanceEntry, SectionName } from '../../../store/finance.store';
import { FinanceTileHeaderActions } from '../finance-tile-header-actions/finance-tile-header-actions';
import { FinanceTileHeaderSuffix } from '../finance-tile-header-suffix/finance-tile-header-suffix';

@Component({
  selector: 'dc-finance-tile-header',
  imports: [LucideAngularModule, FinanceTileHeaderActions, FinanceTileHeaderSuffix],
  template: ` <div class="flex justify-between items-start mb-4">
    <div
      class="flex justify-center items-center min-w-9 min-h-9 p-2 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors"
    >
      <lucide-icon class="h-5 w-5" [name]="icon()"></lucide-icon>
    </div>

    <div class="flex ml-2 gap-2 items-center">
      @let name = entry().name;

      @switch (name) {
        @default {
          <dc-finance-tile-header-actions [entry]="entry()" />
        }
      }

      <dc-finance-tile-header-suffix [entry]="entry()" />
    </div>
  </div>`,
})
export class FinanceTileHeader {
  public entry = input.required<FinanceEntry>();

  public icon = computed<string>(() => {
    const { icon } = this.entry();
    return icon;
  });
}
