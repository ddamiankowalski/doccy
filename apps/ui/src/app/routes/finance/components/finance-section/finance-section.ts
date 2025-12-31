import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FinanceTile } from '../finance-tile/finance-tile';

@Component({
  selector: 'dc-finance-section',
  host: {
    class: 'block text-lg font-semibold text-white tracking-tight mt-16',
  },
  template: ` <section>
    <summary class="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
      {{ title() }}

      <div class="flex items-center gap-2">
        <span class="text-sm text-gray-500 font-medium">Total</span>
        <span class="text-lg font-bold text-white tracking-tight">{{ value() }}</span>
      </div>
    </summary>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <dc-finance-tile />
      <dc-finance-tile />
      <dc-finance-tile />
      <dc-finance-tile />
      <dc-finance-tile />
      <dc-finance-tile />
    </div>
  </section>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FinanceTile],
})
export class FinanceSection {
  public title = input.required<string>();

  public value = input.required<string>();
}
