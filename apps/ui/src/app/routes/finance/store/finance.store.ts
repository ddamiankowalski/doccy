import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { withUser } from '../../user/store/with-user';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { switchMap } from 'rxjs';
import { inject } from '@angular/core';
import { FinanceHttpService } from './finance-http.service';
import { tapResponse } from '@ngrx/operators';
import { Asset } from './type';

type FinanceState = {
  assets: Asset[];
  assetsLoading: boolean;
  assetsError: boolean;
};

const initialState: FinanceState = {
  assets: [],
  assetsLoading: false,
  assetsError: false,
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
        patchState(store, { assetsLoading: true, assetsError: false, assets: [] });

        return http.fetchAssets$().pipe(
          tapResponse({
            next: ({ assets }) => patchState(store, { assets }),
            error: () => patchState(store, { assetsError: true }),
            finalize: () => patchState(store, { assetsLoading: false }),
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
