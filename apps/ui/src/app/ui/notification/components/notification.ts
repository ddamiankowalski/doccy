import { Component } from '@angular/core';

export type NotificationType = 'success' | 'error';

@Component({
  selector: 'dc-notification',
  template: `i am notification`,
})
export class Notification {}
