import { Component, ComponentRef, input, signal } from '@angular/core';
import { PrimaryButton } from '../../button/primary-button/primary-button';
import { SecondaryButton } from '../../button/secondary-button/secondary-button';
import { TranslatePipe } from '@ngx-translate/core';

export type ConfirmResult = {
  type: 'confirm' | 'cancel';
};

export type ConfirmOpts = {
  title: string;
  message: string;
};

@Component({
  selector: 'dc-confirm',
  imports: [PrimaryButton, SecondaryButton, TranslatePipe],
  template: `
    <div class="flex flex-col gap-2">
      <span class="text-white text-lg font-medium leading-none">{{ title() }}</span>
      <span class="text-gray-400 text-xs font-medium">{{ message() }}</span>
    </div>

    <div class="flex gap-2">
      <dc-secondary-button (clicked)="onCancel()">{{ 'CANCEL' | translate }}</dc-secondary-button>
      <dc-primary-button (clicked)="onConfirm()">{{ 'CONFIRM' | translate }}</dc-primary-button>
    </div>
  `,
})
export class Confirm<T> {
  public title = input.required<string>();
  public message = input.required<string>();
  public ref = input.required<ComponentRef<Confirm<T>>>();

  public result = signal<ConfirmResult | null>(null);

  public onCancel(): void {
    this.result.set({ type: 'cancel' });
    this._destroy();
  }

  public onConfirm(): void {
    this.result.set({ type: 'confirm' });
    this._destroy();
  }

  private _destroy(): void {
    this.ref().destroy();
  }
}
