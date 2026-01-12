import { Component, inject, input } from '@angular/core';
import { IconButton } from '../../../../../ui/button/icon-button/icon-button';
import { FinanceAdd } from '../../finance-add/finance-add';
import { OverlayService } from '../../../../../ui/overlay/services/overlay.service';
import { FinanceEntry, FinanceStore } from '../../../store/finance.store';
import { FinanceEntryDetails } from '../../finance-entry-details/finance-entry-details';
import { catchError, EMPTY, switchMap, tap } from 'rxjs';

@Component({
  selector: 'dc-finance-tile-header-actions',
  imports: [IconButton],
  template: ` <div class="flex invisible group-hover/tile:visible gap-1">
    <dc-icon-button (clicked)="onMoreClicked()" name="ellipsis" />
    <dc-icon-button (clicked)="onAddClicked()" name="plus" />
    <dc-icon-button (clicked)="onTrashClicked()" name="trash" type="error" />
  </div>`,
})
export class FinanceTileHeaderActions {
  public entry = input.required<FinanceEntry>();

  private _overlay = inject(OverlayService);
  private _finance = inject(FinanceStore);

  public onMoreClicked(): void {
    this._overlay.openModal({
      component: FinanceEntryDetails,
      closeOnBackdrop: false,
      data: { name: this.entry().name, type: this.entry().type },
    });
  }

  public onAddClicked(): void {
    this._overlay.openModal({
      component: FinanceAdd,
      closeOnBackdrop: false,
      data: { name: this.entry().name, type: this.entry().type },
    });
  }

  public onTrashClicked(): void {
    this._overlay
      .openConfirm$({
        message:
          'You are removing asset entry, this action is irreversible and all data will be lost',
        title: 'Removing asset entry',
      })
      .pipe(
        switchMap(({ ref, type }) => {
          if (type === 'cancel') {
            ref.destroy();
            return EMPTY;
          }

          const { id } = this.entry();
          return this._finance.removeEntry$(this.entry().section, id).pipe(
            catchError(() => {
              ref.destroy();
              return EMPTY;
            }),
            tap(() => ref.destroy()),
          );
        }),
      )
      .subscribe();
  }
}
