import { Component, computed, HostListener, inject, input } from '@angular/core';
import {
  Notification as NotificationInfo,
  NotificationService,
} from '../services/notification.service';
import { NgClass } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'dc-notification',
  imports: [NgClass, LucideAngularModule],
  host: {
    class: 'pointer-events-auto',
  },
  template: `
    <div
      animate.enter="fade-in"
      class="relative w-120 bg bg-charcoal-light flex gap-1 flex-col py-2 px-4 border border-white/5 rounded-md"
    >
      <div class="flex items-center gap-2">
        <lucide-icon [ngClass]="[titleText()]" class="w-3.5 h-3.5" [name]="iconName()" />
        <span [ngClass]="[titleText()]" class="text-sm font-medium">{{
          notification().title
        }}</span>
      </div>
      <span [ngClass]="[messageText()]" class="ml-5.5 text-xs">{{ notification().message }}</span>

      <button
        (click)="onButtonClick()"
        class="group/button absolute cursor-pointer p-2 right-0 top-0 flex item-center justify-center"
      >
        <lucide-icon
          class="h-4 w-4 text-gray-400
           group-hover/button:text-white
           transition-colors"
          name="x"
        ></lucide-icon>
      </button>
    </div>
  `,
})
export class Notification {
  @HostListener('mouseenter')
  public onMouseEnter(): void {
    if (this._timeoutRef) {
      clearInterval(this._timeoutRef);
    }
  }

  @HostListener('mouseleave')
  public onMouseLeave(): void {
    this._startTimeout();
  }

  public onButtonClick(): void {
    this._close();
  }

  public titleText = computed(() => {
    switch (this.notification().type) {
      case 'error':
        return 'text-[#ff6466]';
      case 'success':
        return 'text-white';
    }
  });

  public messageText = computed(() => {
    switch (this.notification().type) {
      case 'error':
        return 'text-[#ff6466]';
      case 'success':
        return 'text-gray-400';
    }
  });

  public iconName = computed(() => {
    switch (this.notification().type) {
      case 'error':
        return 'circle-alert';
      case 'success':
        return 'circle-check';
    }
  });

  public notification = input.required<NotificationInfo>();

  private _notification = inject(NotificationService);
  private _timeoutRef: ReturnType<typeof setTimeout> | null = null;

  private readonly TIMEOUT_MS = 3000;

  constructor() {
    this._startTimeout();
  }

  private _startTimeout(): void {
    if (this._timeoutRef) {
      clearTimeout(this._timeoutRef);
    }

    this._timeoutRef = setTimeout(() => {
      this._close();
    }, this.TIMEOUT_MS);
  }

  private _close(): void {
    this._notification.close(this.notification().id);
  }
}
