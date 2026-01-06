import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { withUser } from '../../user/store/with-user';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { switchMap } from 'rxjs';
import { inject } from '@angular/core';
import { FinanceHttpService } from './finance-http.service';

type FinanceState = {
  loading: boolean;
};

const initialState: FinanceState = {
  loading: true,
};

export const FinanceStore = signalStore(
  { providedIn: 'root', protectedState: false },
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

    const fetch = rxMethod<void>(switchMap(() => http.fetch$()));

    return {
      fetch,
      _reset,
    };
  }),
  withUser()
);
