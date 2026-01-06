import { signalStore, withMethods, withState } from '@ngrx/signals';

type FinanceState = {
  loading: boolean;
};

const initialState: FinanceState = {
  loading: true,
};

export const FinanceStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods(() => {})
);
