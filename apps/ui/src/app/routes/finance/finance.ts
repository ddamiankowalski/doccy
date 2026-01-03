import { Component } from '@angular/core';
import { FinanceSection } from './components/finance-section/finance-section';
import { Disclaimer } from '../../ui/components/disclaimer/disclaimer';

@Component({
  selector: 'dc-finance',
  host: {
    class: '',
  },
  template: ` <dc-finance-section title="Assets" value="$1,245,300" /><dc-finance-section
      title="Liabilities"
      value="$361,700"
    /><dc-finance-section title="Monthly Income" value="$1,245,300" />

    <dc-disclaimer title="some title" description="some description" icon="wallet" />`,
  imports: [FinanceSection, Disclaimer],
})
export class Finance {}
