import { Component, computed, inject, input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { Tile } from '../../../../ui/components/tile/tile';
import { FinanceEntry, FinanceStore, SectionName } from '../../store/finance.store';
import { FinanceTileHeader } from './finance-tile-header/finance-tile-header';
import { FinanceTileDisplay } from './finance-tile-display/finance-tile-display';
import { FinanceTileFooter } from './finance-tile-footer/finance-tile-footer';
import { Spinner } from '../../../../ui/loader/components/spinner/spinner';
import { Disclaimer } from '../../../../ui/components/disclaimer/disclaimer';
import { TagButton } from '../../../../ui/button/tag-button/tag-button';

@Component({
  selector: 'dc-finance-tile',
  imports: [
    LucideAngularModule,
    Tile,
    FinanceTileHeader,
    FinanceTileDisplay,
    FinanceTileFooter,
    Spinner,
    Disclaimer,
    TagButton,
    LucideAngularModule,
  ],
  template: `
    <dc-tile class="group/tile">
      @if (entry().error) {
        <div class="flex flex-col items-center">
          <dc-disclaimer
            class="my-4"
            icon="bug"
            description="Error occurred while fetching entry"
          />
          <dc-tag-button (clicked)="onRefresh()">
            <lucide-icon class="h-3 w-3" name="refresh-ccw"></lucide-icon>
            Refresh</dc-tag-button
          >
        </div>
      } @else if (entry().loading) {
        <dc-spinner />
      } @else {
        <dc-finance-tile-header [entry]="entry()" />
        <dc-finance-tile-display [entry]="entry()" />
        <dc-finance-tile-footer [entry]="entry()" />
      }
    </dc-tile>
  `,
})
export class FinanceTile<T extends FinanceEntry> {
  public entry = input.required<T>();
  public name = input.required<SectionName>();

  public finance = inject(FinanceStore);

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

  public onRefresh(): void {
    this.finance.fetchEntry$(this.name(), this.entry().id).subscribe();
  }
}
