import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'dc-finance-section',
  host: {
    class: 'text-lg font-semibold text-white tracking-tight',
  },
  template: ` <section class="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
    {{ title() }}

    <div class="flex items-center gap-2">
      <span class="text-sm text-gray-500 font-medium">Total</span>
      <span class="text-lg font-bold text-white tracking-tight">{{ value() }}</span>
    </div>
  </section>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinanceSection {
  public title = input.required<string>();

  public value = input.required<string>();
}
