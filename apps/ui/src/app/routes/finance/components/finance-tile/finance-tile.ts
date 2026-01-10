import { Component, computed, inject, input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { Tile } from '../../../../ui/components/tile/tile';
import { ProgressBar } from '../../../../ui/components/progress-bar/progress-bar';
import { FinanceEntry, FinanceStore, SectionName } from '../../store/finance.store';
import { IconButton } from '../../../../ui/button/icon-button/icon-button';
import { OverlayService } from '../../../../ui/overlay/services/overlay.service';
import { EMPTY, switchMap, tap, catchError } from 'rxjs';
import { FinanceEntryDetails } from '../finance-entry-details/finance-entry-details';

@Component({
  selector: 'dc-finance-tile',
  imports: [LucideAngularModule, Tile, ProgressBar, IconButton],
  template: `
    <dc-tile class="group/tile">
      <div class="flex justify-between items-start mb-4">
        <div
          class="flex justify-center items-center min-w-9 min-h-9 p-2 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors"
        >
          <lucide-icon class="h-5 w-5" [name]="icon()"></lucide-icon>
        </div>

        <div class="flex ml-2 gap-2 items-center">
          <div class="flex invisible group-hover/tile:visible gap-1">
            <dc-icon-button (clicked)="onMoreClicked()" name="ellipsis" />
            <dc-icon-button name="plus" />
            <dc-icon-button (clicked)="onTrashClicked()" name="trash" type="error" />
          </div>

          <div
            class="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full text-emerald-400 bg-emerald-400/10"
          >
            <lucide-icon class="self-center h-3 w-3" name="trending-up"></lucide-icon>
            1.25%
          </div>
        </div>
      </div>

      <h3 class="text-gray-400 text-sm font-medium mb-1">{{ title() }}</h3>
      <div class="text-2xl font-semibold text-white tracking-tight mb-4">$850,000</div>

      <dc-progress-bar class="mt-auto" [value]="65" description="House down payment" />
    </dc-tile>
  `,
})
export class FinanceTile<T extends FinanceEntry> {
  public entry = input.required<T>();
  public name = input.required<SectionName>();

  public overlay = inject(OverlayService);
  public finance = inject(FinanceStore);

  public title = computed(() => {
    const { name } = this.entry();
    return name;
  });

  public icon = computed(() => {
    const { type } = this.entry();
    switch (type) {
      case 'estate':
        return 'house';
      case 'bonds':
        return 'dollar-sign';
    }

    return 'circle-question-mark';
  });

  public onMoreClicked(): void {
    this.overlay.openModal({
      component: FinanceEntryDetails,
      title: 'ENTRY_DETAILS_' + this.name().toUpperCase(),
      description: `ENTRY_DETAILS_${this.name().toUpperCase()}_DESCRIPTION`,
      closeOnBackdrop: false,
      data: { name: this.name() },
    });
  }

  public onTrashClicked(): void {
    this.overlay
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
          return this.finance.removeEntry$(this.name(), id).pipe(
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
