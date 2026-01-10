import { Component, ComponentRef, input, signal } from '@angular/core';
import { PrimaryButton } from '../../button/primary-button/primary-button';
import { SecondaryButton } from '../../button/secondary-button/secondary-button';
import { TranslatePipe } from '@ngx-translate/core';
import { Tile } from '../../components/tile/tile';
import { BehaviorSubject, Subject } from 'rxjs';
import { AsyncPipe } from '@angular/common';

export type ConfirmResult = {
  type: 'confirm' | 'cancel';
  ref: ComponentRef<Confirm>;
};

export type ConfirmOpts = {
  title: string;
  message: string;
};

@Component({
  selector: 'dc-confirm',
  imports: [PrimaryButton, SecondaryButton, TranslatePipe, Tile, AsyncPipe],
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

          @let clicked = clicked$ | async;
          <div class="flex gap-2">
            <dc-secondary-button
              class="flex-1"
              (clicked)="onCancel()"
              [isDisabled]="clicked !== null"
              >{{ 'CANCEL' | translate }}</dc-secondary-button
            >
            <dc-primary-button
              class="flex-1"
              (clicked)="onConfirm()"
              [isLoading]="clicked !== null"
              >{{ 'CONFIRM' | translate }}</dc-primary-button
            >
          </div>
        </dc-tile>
      </div>
    </div>
  `,
})
export class Confirm {
  public title = input.required<string>();
  public message = input.required<string>();
  public ref = input.required<ComponentRef<Confirm>>();

  public clicked$ = new BehaviorSubject<ConfirmResult | null>(null);

  public onCancel(): void {
    this.clicked$.next({ type: 'cancel', ref: this.ref() });
  }

  public onConfirm(): void {
    this.clicked$.next({ type: 'confirm', ref: this.ref() });
  }
}
