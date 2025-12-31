import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FinanceSection } from './components/finance-section/finance-section';

@Component({
  selector: 'dc-finance',
  host: {
    class: '',
  },
  template: ` <dc-finance-section title="Assets" value="$1,245,300" /><dc-finance-section
      title="Liabilities"
      value="$361,700"
    /><dc-finance-section title="Monthly Income" value="$1,245,300" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FinanceSection],
})
export class Finance {}
