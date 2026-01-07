import { Component, inject } from '@angular/core';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'dc-notification',
  template: `
    <div [id]="notification.wrapperId">
      @for(notification of notification.entries(); track $index) {
      <span>{{ notification.title }}</span>
      <span>{{ notification.message }}</span>
      }
    </div>
  `,
})
export class NotificationWrapper {
  public notification = inject(NotificationService);
}
