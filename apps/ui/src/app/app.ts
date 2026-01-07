import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotificationService } from './ui/notification/services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [RouterOutlet],
})
export class App {
  constructor() {
    const service = inject(NotificationService);
    setInterval(() => {
      service.success('Success!', 'something else');
    }, 2000);
  }
}
