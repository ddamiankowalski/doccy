import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'dc-finance-tile',
  host: {
    class:
      'bg-[#1a1a1a] border border-white/5 rounded-xl p-6 hover:border-white/10 transition-colors group ',
  },
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinanceTile {}
