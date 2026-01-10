import {
  ApplicationRef,
  createComponent,
  EnvironmentInjector,
  inject,
  Injectable,
  Type,
} from '@angular/core';
import { Modal } from '../components/modal';
import { filter, Observable, take } from 'rxjs';
import { Confirm, ConfirmOpts, ConfirmResult } from '../components/confirm';

type ModalConfig<T, K = any> = {
  component: Type<T>;
  title?: string;
  description?: string;
  closeOnBackdrop?: boolean;
  data?: K;
};

@Injectable({
  providedIn: 'root',
})
export class OverlayService {
  private readonly _id = 'dc-overlay';

  private _injector = inject(EnvironmentInjector);
  private _appRef = inject(ApplicationRef);

  public openConfirm$({ title, message }: ConfirmOpts): Observable<ConfirmResult> {
    const overlay = document.getElementById(this._id);
    const hostElement = this._createHost();

    if (!overlay) {
      throw new Error('Could not open modal because host was not found');
    }

    const ref = createComponent(Confirm, {
      environmentInjector: this._injector,
      hostElement,
    });

    ref.setInput('ref', ref);
    ref.setInput('message', message);
    ref.setInput('title', title);

    ref.instance.clicked$;

    this._appRef.attachView(ref.hostView);
    overlay.append(hostElement);

    return ref.instance.clicked$.pipe(
      filter((result) => result !== null),
      take(1),
    );
  }

  /**
   * Opens modal
   */
  public openModal<T>({
    component,
    title = undefined,
    description = undefined,
    closeOnBackdrop = true,
    data,
  }: ModalConfig<T>): void {
    const overlay = document.getElementById(this._id);
    const hostElement = this._createHost();

    if (!overlay) {
      throw new Error('Could not open modal because host was not found');
    }

    const ref = createComponent(Modal, {
      environmentInjector: this._injector,
      hostElement,
    });

    ref.setInput('ref', ref);
    ref.setInput('component', component);

    ref.setInput('title', title);
    ref.setInput('description', description);
    ref.setInput('closeOnBackdrop', closeOnBackdrop);
    ref.setInput('data', data);

    this._appRef.attachView(ref.hostView);
    overlay.append(hostElement);
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
