import { signalStore, withMethods, withState } from '@ngrx/signals';
import { withUserReset } from '../../user/store/with-user';
import { withAssets } from './with-assets';
import { withLiabilities } from './with-liabilities';
import { withIncome } from './with-income';
import { Observable, of } from 'rxjs';
import { InputField } from '../../../ui/input/input-form/type';
import { inject } from '@angular/core';
import { FinanceHttpService } from './finance-http.service';

export type SectionName = 'assets' | 'liabilities' | 'income';

export type FinanceEntry = {
  name: string;
  uuid: string;
};

export type FinanceSection = {
  total: number;
  loading: boolean;
  error: boolean;
  entries: FinanceEntry[];
};

export type EntryFields = {
  metadata: InputField[];
  error: boolean;
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
  error: false,
  entries: [],
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
    const http = inject(FinanceHttpService);

    /**
     * Resets the state
     */
    const _reset = () => {
      store._resetAssets();
      store._resetLiabilities();
      store._resetIncome();
    };

    /**
     * Fetches entries for a given section
     *
     * @param name
     * @returns
     */
    const fetchEntries = (name: SectionName) => {
      switch (name) {
        case 'assets':
          return store.fetchAssetEntries();
        case 'liabilities':
          return store.fetchLiabilitiesEntries();
        case 'income':
          return store.fetchIncomeEntries();
      }
    };

    const addEntry = ({ name, model }: { name: SectionName; model: Record<string, any> }) => {
      switch (name) {
        case 'assets':
          return store.addAssetEntry(model);
        case 'liabilities':
          return store.addLiabilityEntry(model);
        case 'income':
          return store.addIncomeEntry(model);
      }
    };

    const fetchFields$ = (name: SectionName): Observable<InputField[]> => {
      return http.fetchEntryFields$(name);
    };

    return {
      _reset,
      fetchEntries,
      addEntry,
      fetchFields$,
    };
  }),
  withUserReset(),
);
