import { Component } from '@angular/core';

@Component({
  selector: 'dc-header-user',
  host: {
    class: 'flex gap-3 items-center',
  },
  imports: [],
  template: `
    <div class="flex flex-col items-end">
      <span class="text-sm font-medium text-white">Alex Morgan</span>
      <span class="text-xs text-gray-400">Standard User</span>
    </div>

    <div
      class="h-10 w-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center overflow-hidden ring-2 ring-transparent hover:ring-gray-600 transition-all"
    >
      <img src="/img/profile.avif" />
    </div>
  `,
})
export class HeaderUser {}
