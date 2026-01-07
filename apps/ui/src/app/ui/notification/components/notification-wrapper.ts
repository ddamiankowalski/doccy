import { Component, inject } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { Notification } from './notification';

@Component({
  selector: 'dc-notification-wrapper',
  imports: [Notification],
  template: `
    <div class="flex flex-col gap-2 top-0 right-0 absolute p-8" [id]="notification.wrapperId">
      @for(notification of notification.entries(); track $index) {
      <dc-notification [notification]="notification" />
      }
    </div>
  `,
})
export class NotificationWrapper {
  public notification = inject(NotificationService);
}
