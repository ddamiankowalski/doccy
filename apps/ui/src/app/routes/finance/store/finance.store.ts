import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { withUserReset } from '../../user/store/with-user';
import { withAssets } from './with-assets';
import { withLiabilities } from './with-liabilities';
import { withIncome } from './with-income';
import { catchError, EMPTY, Observable, of, tap } from 'rxjs';
import { InputField } from '../../../ui/input/input-form/type';
import { inject } from '@angular/core';
import { FinanceHttpService } from './finance-http.service';
import { NotificationService } from '../../../ui/notification/services/notification.service';

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
    const notification = inject(NotificationService);

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

    const addEntry$ = (name: SectionName, model: object): Observable<FinanceEntry> => {
      return http.addEntry$(name, model).pipe(
        catchError(() => {
          notification.error('ERROR_NOTIFICATION', 'ERROR_ADD_ENTRY');
          return EMPTY;
        }),
        tap((added) => {
          notification.success('SUCCESS_NOTIFICATION', 'SUCCESS_ADD_ENTRY');

          patchState(store, (state) => {
            const { entries, ...section } = state[name];
            return { [name]: { ...section, entries: [...entries, added] } };
          });
        }),
      );
    };

    const fetchFields$ = (name: SectionName): Observable<InputField[]> => {
      return http.fetchEntryFields$(name);
    };

    return {
      _reset,
      fetchEntries,
      addEntry$,
      fetchFields$,
    };
  }),
  withUserReset(),
);
