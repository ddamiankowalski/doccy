import { signalStore, withMethods, withState } from '@ngrx/signals';
import { withUserReset } from '../../user/store/with-user';
import { withAssets } from './with-assets';
import { withLiabilities } from './with-liabilities';
import { withIncome } from './with-income';

export type SectionName = 'assets' | 'liabilities' | 'income';

export type FinanceSection = {
  total: number;
  loading: boolean;
};

type FinanceState = {
  assets: FinanceSection;
  liabilities: FinanceSection;
  income: FinanceSection;
};

export const sectionState: FinanceSection = {
  total: 0,
  loading: false,
};

const initialState: FinanceState = {
  assets: sectionState,
  income: sectionState,
  liabilities: sectionState,
};

export const FinanceStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withAssets(),
  withLiabilities(),
  withIncome(),
  withMethods((store) => {
    /**
     * Resets the state
     */
    const _reset = () => {
      store._resetAssets();
      store._resetLiabilities();
      store._resetIncome();
    };

    return {
      _reset,
    };
  }),
  withUserReset(),
);
