import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { withUser } from '../../user/store/with-user';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { switchMap } from 'rxjs';
import { inject } from '@angular/core';
import { FinanceHttpService } from './finance-http.service';
import { tapResponse } from '@ngrx/operators';
import { Asset, Section } from './type';

type FinanceState = {
  assets: Section<Asset>;
  liabilities: Section<Asset>;
  income: Section<Asset>;
};

const initialState: FinanceState = {
  assets: { entries: [], error: false, loading: false },
  liabilities: { entries: [], error: false, loading: false },
  income: { entries: [], error: false, loading: false },
};

export const FinanceStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => {
    const http = inject(FinanceHttpService);

    /**
     * Resets the finance store to
     * initial state
     *
     * @returns
     */
    const _reset = (): void => patchState(store, initialState);

    const fetchAssets = rxMethod<void>(
      switchMap(() => {
        patchState(store, ({ assets }) => ({ assets: { ...assets, loading: true, error: false } }));

        return http.fetchAssets$().pipe(
          tapResponse({
            next: ({ entries }) =>
              patchState(store, ({ assets }) => ({ assets: { ...assets, entries } })),
            error: () =>
              patchState(store, ({ assets }) => ({
                assets: { ...assets, error: true },
              })),
            finalize: () =>
              patchState(store, ({ assets }) => ({ assets: { ...assets, loading: false } })),
          })
        );
      })
    );

    return {
      fetchAssets,
      _reset,
    };
  }),
  withUser()
);
