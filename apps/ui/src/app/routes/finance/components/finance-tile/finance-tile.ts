import { Component, computed, input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { Tile } from '../../../../ui/components/tile/tile';
import { ProgressBar } from '../../../../ui/components/progress-bar/progress-bar';
import { FinanceEntry, SectionName } from '../../store/finance.store';
import { FinanceTileHeader } from './finance-tile-header/finance-tile-header';

@Component({
  selector: 'dc-finance-tile',
  imports: [LucideAngularModule, Tile, ProgressBar, FinanceTileHeader],
  template: `
    <dc-tile class="group/tile">
      <dc-finance-tile-header [entry]="entry()" />

      <h3 class="text-gray-400 text-sm font-medium mb-1">{{ title() }}</h3>
      <div class="text-2xl font-semibold text-white tracking-tight mb-4">$850,000</div>

      <dc-progress-bar class="mt-auto" [value]="65" description="House down payment" />
    </dc-tile>
  `,
})
export class FinanceTile<T extends FinanceEntry> {
  public entry = input.required<T>();
  public name = input.required<SectionName>();

  public title = computed(() => {
    const { name } = this.entry();
    return name;
  });

  public icon = computed(() => {
    const { type } = this.entry();
    switch (type) {
      case 'estate':
        return 'house';
      case 'bonds':
        return 'dollar-sign';
    }

    return 'circle-question-mark';
  });
}
