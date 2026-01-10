import { Component, ComponentRef, input, signal } from '@angular/core';
import { PrimaryButton } from '../../button/primary-button/primary-button';
import { SecondaryButton } from '../../button/secondary-button/secondary-button';
import { TranslatePipe } from '@ngx-translate/core';
import { Tile } from '../../components/tile/tile';

export type ConfirmResult = {
  type: 'confirm' | 'cancel';
};

export type ConfirmOpts = {
  title: string;
  message: string;
};

@Component({
  selector: 'dc-confirm',
  imports: [PrimaryButton, SecondaryButton, TranslatePipe, Tile],
  template: `
    <div
      animate.enter="fade-in"
      class="flex justify-center items-center fixed w-full h-full"
      style="background-color: rgba(0, 0, 0, 0.5);"
    >
      <div class="min-h-0 max-w-[20rem]">
        <dc-tile>
          <div class="text-center flex flex-col gap-4 mb-4">
            <span class="text-white text-lg font-medium leading-none">{{ title() }}</span>
            <span class="text-gray-400 text-xs font-medium">{{ message() }}</span>
          </div>

          <div class="flex gap-2">
            <dc-secondary-button class="flex-1" (clicked)="onCancel()">{{
              'CANCEL' | translate
            }}</dc-secondary-button>
            <dc-primary-button class="flex-1" (clicked)="onConfirm()">{{
              'CONFIRM' | translate
            }}</dc-primary-button>
          </div>
        </dc-tile>
      </div>
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
