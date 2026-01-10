import { Component, computed, inject, input, OnInit } from '@angular/core';
import { FinanceTile } from '../finance-tile/finance-tile';
import { FinanceAddTile } from '../finance-add-tile/finance-add-tile';
import { FinanceAdd } from '../finance-add/finance-add';
import { OverlayService } from '../../../../ui/overlay/services/overlay.service';
import { FinanceStore } from '../../store/finance.store';
import { Spinner } from '../../../../ui/loader/components/spinner/spinner';
import { Disclaimer } from '../../../../ui/components/disclaimer/disclaimer';
import { TitleCasePipe } from '@angular/common';
import { PrimaryButton } from '../../../../ui/button/primary-button/primary-button';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'dc-finance-section',
  host: {
    class: 'block text-lg font-semibold text-white tracking-tight mt-16',
  },
  template: ` <section>
    <summary class="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
      {{ type() | titlecase }}

      <div class="flex items-center gap-2">
        <span class="text-sm text-gray-500 font-medium">Total</span>
        <span class="text-lg font-bold text-white tracking-tight"
          >{{ finance.total()[type()] }} zł</span
        >
      </div>
    </summary>

    @if (section().loading) {
      <dc-spinner class="my-24" />
    } @else if (section().error) {
      <dc-disclaimer
        class="my-24"
        icon="bug"
        title="Something went wrong"
        description="Could not fetch data right now. Please refresh this section to try again"
      />
    } @else {
      @if (section().entries.length > 0) {
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          @for (entry of section().entries; track $index) {
            <dc-finance-tile title="Stocks" />
          }

          <dc-finance-add-tile (click)="onAddClick()" />
        </div>
      } @else {
        <div class="flex flex-col gap-6 items-center justify-center my-24">
          <dc-disclaimer
            icon="badge-info"
            title="No entries"
            description="Please add a new entry to see the results here"
          />
          <dc-primary-button (clicked)="onAddClick()">{{
            'NEW_ENTRY' | translate
          }}</dc-primary-button>
        </div>
      }
    }
  </section>`,
  imports: [
    FinanceTile,
    FinanceAddTile,
    Spinner,
    Disclaimer,
    TitleCasePipe,
    PrimaryButton,
    TranslatePipe,
  ],
})
export class FinanceSection implements OnInit {
  public type = input.required<FinanceSection>();

  public finance = inject(FinanceStore);
  private _overlay = inject(OverlayService);

  public section = computed(() => {
    const type = this.type();
    return this.finance[type]();
  });

  public ngOnInit(): void {
    this._fetch();
  }

  public onAddClick(): void {
    this._overlay.openModal({
      component: FinanceAdd,
      title: 'ADD_NEW_' + this.type().toUpperCase(),
      description: `ADD_NEW_${this.type().toUpperCase()}_DESCRIPTION`,
      closeOnBackdrop: false,
      data: { type: this.type() },
    });
  }

  private _fetch(): void {
    switch (this.type()) {
      case 'assets':
        this.finance.fetchAssets();
        return;
      case 'liabilities':
        this.finance.fetchLiabilities();
        return;
      case 'income':
        return;
    }
  }
}
