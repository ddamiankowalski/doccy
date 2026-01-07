import {
  createComponent,
  Injectable,
  inject,
  EnvironmentInjector,
  Injector,
  ApplicationRef,
} from '@angular/core';
import { NotificationType } from '../components/notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly _id = 'dc-notifications';

  private _injector = inject(EnvironmentInjector);
  private _appRef = inject(ApplicationRef);

  public success(title: string, message: string): void {
    this._addNotification(title, message, 'success');
  }

  public error(title: string, message: string): void {
    this._addNotification(title, message, 'error');
  }

  private _addNotification(title: string, message: string, type: NotificationType): void {
    const notification = document.getElementById(this._id);
    const hostElement = this._createHost();

    if (!notification) {
      throw new Error('Could not open notification because host was not found');
    }

    const ref = createComponent(Notification, {
      environmentInjector: this._injector,
      hostElement,
    });

    ref.setInput('title', title);
    ref.setInput('message', message);
    ref.setInput('type', type);

    this._appRef.attachView(ref.hostView);
    notification.append(hostElement);
  }

  private _createHost(): HTMLDivElement {
    const element = document.createElement('div');

    element.style.position = 'absolute';
    element.style.top = '0';
    element.style.left = '0';
    element.style.width = '100vw';
    element.style.height = '100vh';

    return element;
  }
}
