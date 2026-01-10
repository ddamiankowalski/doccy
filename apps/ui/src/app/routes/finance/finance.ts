import { Component } from '@angular/core';
import { FinanceSection } from './components/finance-section/finance-section';

@Component({
  selector: 'dc-finance',
  host: {
    class: '',
  },
  template: ` <dc-finance-section name="assets" />
    <dc-finance-section name="liabilities" />
    <dc-finance-section name="income" />`,
  imports: [FinanceSection],
})
export class Finance {}
