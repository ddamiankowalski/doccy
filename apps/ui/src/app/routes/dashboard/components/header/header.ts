import { Component, inject } from '@angular/core';
import { HeaderUser } from '../header-user/header-user';
import { LucideAngularModule } from 'lucide-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'dc-header',
  host: {
    class: 'w-full',
  },
  imports: [HeaderUser, LucideAngularModule],
  template: ` <header class="flex items-center justify-between">
    <div class="flex gap-6">
      <div class="flex justify-center items-center p-2 bg-white text-black rounded-lg w-12">
        <lucide-icon class="h-5 w-5" name="wallet-cards"></lucide-icon>
      </div>
      <div>
        <h1 class="text-2xl font-bold tracking-tight">Finance Overview</h1>
        <h2 class="text-gray-400 text-sm">Welcome back, here's your financial summary</h2>
      </div>
    </div>

    <nav class="flex ml-auto mr-24 gap-8 items-center text-sm text-gray-500">
      <button
        (click)="onNavClick('finance')"
        class="cursor-pointer hover:text-white transition-colors"
      >
        Finance
      </button>
      <button
        (click)="onNavClick('tasks')"
        class="cursor-pointer hover:text-white transition-colors"
      >
        Tasks
      </button>
    </nav>

    <dc-header-user />
  </header>`,
})
export class Header {
  private _router = inject(Router);

  public onNavClick(route: string): void {
    this._router.navigate(['/', route]);
  }
}
