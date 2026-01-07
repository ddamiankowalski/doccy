import { Component, inject } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { Notification } from './notification';

@Component({
  selector: 'dc-notification-wrapper',
  imports: [Notification],
  template: `
    <div [id]="notification.wrapperId">
      @for(notification of notification.entries(); track $index) {
      <dc-notification [title]="notification.title" [message]="notification.message" />
      }
    </div>
  `,
})
export class NotificationWrapper {
  public notification = inject(NotificationService);
}
