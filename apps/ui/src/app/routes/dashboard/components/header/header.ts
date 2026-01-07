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
    <nav class="hidden md:flex ml-auto mr-24 gap-8 items-center text-sm text-gray-500">
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
        [class.text-white]="route() === 'documents'"
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
