import { Component } from '@angular/core';
import { FinanceSection } from './components/finance-section/finance-section';

@Component({
  selector: 'dc-finance',
  host: {
    class: '',
  },
  template: ` <dc-finance-section type="assets" />
    <dc-finance-section type="liabilities" /><dc-finance-section type="income" />`,
  imports: [FinanceSection],
})
export class Finance {}
