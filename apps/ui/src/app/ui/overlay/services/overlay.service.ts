import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  EnvironmentInjector,
  inject,
  Injectable,
  InjectionToken,
  Injector,
  Type,
} from '@angular/core';
import { Modal } from '../components/modal';

type ModalConfig<T> = {
  component: Type<T>;
  title?: string;
  description?: string;
  closeOnBackdrop?: boolean;
};

/**
 * Injection token for a reference
 */
const MODAL_REF = new InjectionToken<ModalRef>('modal-ref');

type ModalRef = {
  close: () => void;
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
  public openModal<T>({
    component,
    title = undefined,
    description = undefined,
    closeOnBackdrop = true,
  }: ModalConfig<T>): void {
    const overlay = document.getElementById(this._id);
    const hostElement = this._createHost();

    if (!overlay) {
      throw new Error('Could not open modal because host was not found');
    }

    const modalRef: ModalRef = {
      close: () => {
        console.log('??');
      },
    };

    const ref = createComponent(Modal, {
      environmentInjector: this._injector,
      hostElement,
      elementInjector: Injector.create(
        [
          {
            provide: MODAL_REF,
            useValue: modalRef,
          },
        ],
        this._injector
      ),
    });

    ref.setInput('ref', ref);
    ref.setInput('component', component);

    ref.setInput('title', title);
    ref.setInput('description', description);
    ref.setInput('closeOnBackdrop', closeOnBackdrop);

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
