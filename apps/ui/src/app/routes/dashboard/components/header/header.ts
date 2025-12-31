import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderUser } from '../header-user/header-user';

@Component({
  selector: 'dc-header',
  host: {
    class: 'w-full',
  },
  imports: [HeaderUser],
  template: ` <header class="flex justify-between">
    <div class="flex gap-6">
      <div class="p-2 bg-white text-black rounded-lg w-12"></div>
      <div>
        <h1 class="text-2xl font-bold tracking-tight">Finance Overview</h1>
        <h2 class="text-gray-400 text-sm">Welcome back, here's your financial summary</h2>
      </div>
    </div>

    <dc-header-user />
  </header>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {}
