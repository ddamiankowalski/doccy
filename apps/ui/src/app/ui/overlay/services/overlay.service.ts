import {
  ApplicationRef,
  createComponent,
  EnvironmentInjector,
  inject,
  Injectable,
} from '@angular/core';
import { ProgressBar } from '../../components/progress-bar/progress-bar';

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
  public openModal(): void {
    const hostElement = document.getElementById(this._id);

    if (!hostElement) {
      throw new Error('Could not open modal because host was not found');
    }

    const { hostView } = createComponent(ProgressBar, {
      environmentInjector: this._injector,
      hostElement,
    });

    this._appRef.attachView(hostView);
  }
}
