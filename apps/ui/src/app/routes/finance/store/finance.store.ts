import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { withUser } from '../../user/store/with-user';

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
    /**
     * Resets the finance store to
     * initial state
     *
     * @returns
     */
    const _reset = (): void => patchState(store, initialState);

    return {
      _reset,
    };
  }),
  withUser()
);
