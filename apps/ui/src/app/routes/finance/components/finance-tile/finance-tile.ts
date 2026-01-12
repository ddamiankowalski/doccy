import { Component, computed, input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { Tile } from '../../../../ui/components/tile/tile';
import { ProgressBar } from '../../../../ui/components/progress-bar/progress-bar';
import { FinanceEntry, SectionName } from '../../store/finance.store';
import { FinanceTileHeader } from './finance-tile-header/finance-tile-header';
import { FinanceTileDisplay } from './finance-tile-display/finance-tile-display';
import { FinanceTileFooter } from './finance-tile-footer/finance-tile-footer';

@Component({
  selector: 'dc-finance-tile',
  imports: [LucideAngularModule, Tile, FinanceTileHeader, FinanceTileDisplay, FinanceTileFooter],
  template: `
    <dc-tile class="group/tile">
      <dc-finance-tile-header [entry]="entry()" />
      <dc-finance-tile-display [entry]="entry()" />
      <dc-finance-tile-footer [entry]="entry()" />
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
