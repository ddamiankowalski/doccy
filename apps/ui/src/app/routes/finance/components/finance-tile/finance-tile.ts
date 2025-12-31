import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'dc-finance-tile',
  host: {
    class:
      'bg-[#1a1a1a] border border-white/5 rounded-xl p-6 hover:border-white/10 transition-colors group ',
  },
  template: ` <div class="flex justify-between items-start mb-4">
      <div
        class="min-w-9 min-h-9 p-2 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors"
      ></div>
      <div
        class="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full text-emerald-400 bg-emerald-400/10"
      >
        1
      </div>
    </div>

    <h3 class="text-gray-400 text-sm font-medium mb-1">Real Estate</h3>
    <div class="text-2xl font-semibold text-white tracking-tight mb-4">$850,000</div>
    <p class="text-xs text-gray-500 mt-2">
      <span class="text-emerald-400">+8.2%</span> vs last year
    </p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinanceTile {}
