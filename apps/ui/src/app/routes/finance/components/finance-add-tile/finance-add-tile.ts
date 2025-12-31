import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'dc-finance-add-tile',
  host: {
    class:
      'flex flex-col items-center justify-center h-full min-h-[180px] w-full bg-[#1a1a1a]/50 border-2 border-dashed border-white/10 rounded-xl p-6 hover:border-white/30 hover:bg-[#1a1a1a] transition-all duration-200 group cursor-pointer ',
  },
  template: `<div
      class="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center mb-3 group-hover:bg-white/10 group-hover:scale-110 transition-all duration-200"
    ></div>
    <span class="text-sm font-medium text-gray-500 group-hover:text-gray-300 transition-colors"
      >Add Asset</span
    >`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinanceAddTile {}
