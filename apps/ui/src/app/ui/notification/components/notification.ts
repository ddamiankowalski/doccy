import { Component, input } from '@angular/core';

export type NotificationType = 'success' | 'error';

@Component({
  selector: 'dc-notification',
  template: `
    <div>
      <span>{{ title() }}</span>
      <span>{{ message() }}</span>
    </div>
  `,
})
export class Notification {
  public title = input.required<string>();
  public message = input.required<string>();
  public type = input.required<NotificationType>();
}
