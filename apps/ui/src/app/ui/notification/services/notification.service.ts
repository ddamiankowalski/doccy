import {
  createComponent,
  Injectable,
  inject,
  EnvironmentInjector,
  ApplicationRef,
  signal,
} from '@angular/core';
import { NotificationWrapper } from '../components/notification-wrapper';

export type Notification = {
  id: number;
  title: string;
  message: string;
  type: NotificationType;
};

export type NotificationType = 'success' | 'error';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private static _id = 0;

  private readonly _id = 'dc-notifications';
  public readonly wrapperId = 'dc-notification-wrapper';

  public entries = signal<Notification[]>([]);

  private _injector = inject(EnvironmentInjector);
  private _appRef = inject(ApplicationRef);

  public success(title: string, message: string): void {
    this._createWrapper();
    this._addNotification(title, message, 'success');
  }

  public error(title: string, message: string): void {
    this._createWrapper();
    this._addNotification(title, message, 'error');
  }

  public close(id: number): void {
    this.entries.update((entries) => entries.filter((entry) => entry.id !== id));
  }

  private _addNotification(title: string, message: string, type: NotificationType): void {
    this.entries.update((entries) => [
      ...entries,
      { message, title, type, id: NotificationService._id },
    ]);

    NotificationService._id++;
  }

  private _createWrapper(): void {
    if (document.getElementById(this.wrapperId) !== null) {
      return;
    }

    const notification = document.getElementById(this._id);
    const hostElement = this._createHost();

    if (!notification) {
      throw new Error('Could not open notification because host was not found');
    }

    const ref = createComponent(NotificationWrapper, {
      environmentInjector: this._injector,
      hostElement,
    });

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
    element.style.pointerEvents = 'none';

    return element;
  }
}
