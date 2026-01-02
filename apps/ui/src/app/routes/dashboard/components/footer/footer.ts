import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'dc-footer',
  host: {
    class:
      'mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500',
  },
  imports: [],
  template: ` <section>©Copyright 2026 | doccy.org</section>
    <nav class="flex gap-6 mt-4 md:mt-0">
      <button class="cursor-pointer hover:text-white transition-colors">Privacy Policy</button>
      <button class="cursor-pointer hover:text-white transition-colors">Terms of Service</button>
      <button class="cursor-pointer hover:text-white transition-colors">Help Center</button>
    </nav>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {}
