import { Component, inject } from '@angular/core';
import { FinanceSection } from './components/finance-section/finance-section';
import { FinanceStore } from './store/finance.store';

@Component({
  selector: 'dc-finance',
  host: {
    class: '',
  },
  template: ` <dc-finance-section title="Assets" value="$1,245,300" /><dc-finance-section
      title="Liabilities"
      value="$361,700"
    /><dc-finance-section title="Monthly Income" value="$1,245,300" />`,
  imports: [FinanceSection],
})
export class Finance {
  private _finance = inject(FinanceStore);

  constructor() {
    this._finance.fetch();
  }
}
