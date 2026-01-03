import {
  ApplicationRef,
  createComponent,
  EnvironmentInjector,
  inject,
  Injectable,
  Type,
} from '@angular/core';
import { Modal } from '../components/modal';

type ModalConfig<T> = {
  component: Type<T>;
};

@Injectable({
  providedIn: 'root',
})
export class OverlayService {
  private readonly _id = 'dc-overlay';

  private _injector = inject(EnvironmentInjector);
  private _appRef = inject(ApplicationRef);

  /**
   * Opens modal
   */
  public openModal<T>(config: ModalConfig<T>): void {
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
    ref.setInput('component', config.component);

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
