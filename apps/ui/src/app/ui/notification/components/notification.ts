import { Component, input } from '@angular/core';

@Component({
  selector: 'dc-notification',
  template: `
    <div class="flex flex-col gap-2">
      <span>{{ title() }}</span>
      <span>{{ message() }}</span>
    </div>
  `,
})
export class Notification {
  public title = input.required<string>();
  public message = input.required<string>();
}
