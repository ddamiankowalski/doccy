import { Component } from '@angular/core';
import { ProgressBar } from '../../../../../ui/components/progress-bar/progress-bar';

@Component({
  selector: 'dc-finance-tile-footer',
  imports: [ProgressBar],
  template: ` <dc-progress-bar class="mt-auto" [value]="65" description="House down payment" />`,
})
export class FinanceTileFooter {}
