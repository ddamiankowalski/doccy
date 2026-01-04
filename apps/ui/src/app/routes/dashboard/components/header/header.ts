import { Component, DestroyRef, inject, signal } from '@angular/core';
import { HeaderUser } from '../header-user/header-user';
import { LucideAngularModule } from 'lucide-angular';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
        [class.text-white]="route() === 'finance'"
      >
        Finance
      </button>
      <button
        (click)="onNavClick('tasks')"
        class="cursor-pointer hover:text-white transition-colors"
        [class.text-white]="route() === 'tasks'"
      >
        Tasks
      </button>
      <button
        (click)="onNavClick('documents')"
        class="cursor-pointer hover:text-white transition-colors"
        [class.text-white]="route() === 'tasks'"
      >
        Documents
      </button>
    </nav>

    <dc-header-user />
  </header>`,
})
export class Header {
  private _router = inject(Router);
  private _destroyRef = inject(DestroyRef);

  public route = signal<string>(this._router.url.replace('/', ''));

  constructor() {
    this._router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(this._destroyRef)
      )
      .subscribe((event: NavigationEnd) => {
        this.route.set(event.urlAfterRedirects.replace('/', ''));
      });
  }

  public onNavClick(route: string): void {
    this._router.navigate(['/', route]);
  }
}
