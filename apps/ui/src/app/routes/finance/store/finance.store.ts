import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { withUserReset } from '../../user/store/with-user';
import { withAssets } from './with-assets';
import { withLiabilities } from './with-liabilities';
import { withIncome } from './with-income';
import { catchError, EMPTY, mergeMap, Observable, of, switchMap, tap } from 'rxjs';
import { InputField } from '../../../ui/input/input-form/type';
import { inject } from '@angular/core';
import { FinanceHttpService } from './finance-http.service';
import { NotificationService } from '../../../ui/notification/services/notification.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

export type SectionName = 'assets' | 'liabilities' | 'income';

export type FinanceEntry = {
  name: string;
  id: string;
  type: string;
};

export type FinanceSection = {
  total: number;
  loading: boolean;
  error: boolean;
  entries: FinanceEntry[];
};

export type FinanceFields = {
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
    const fetchEntries = rxMethod<SectionName>(
      mergeMap((name) => {
        patchState(store, { [name]: { loading: true, error: false, entries: [] } });

        return http.fetchEntries$(name).pipe(
          catchError(() => {
            patchState(store, { [name]: { error: true } });
            return EMPTY;
          }),
          tap((entries) => {
            patchState(store, () => ({
              [name]: { error: false, loading: false, entries },
            }));
          }),
        );
      }),
    );

    /**
     * Adds finance entry
     *
     * @param name
     * @param model
     * @returns
     */
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

    /**
     * Removes finance entry
     *
     * @param name
     * @param id
     * @returns
     */
    const removeEntry$ = (name: SectionName, id: string): Observable<any> => {
      return http.removeEntry$(name, id).pipe(
        catchError((err) => {
          notification.error('ERROR_NOTIFICATION', 'ERROR_REMOVE_ENTRY');
          throw err;
        }),
        tap(() => {
          notification.success('SUCCESS_NOTIFICATION', 'SUCCESS_REMOVE_ENTRY');

          patchState(store, (state) => {
            const { entries, ...section } = state[name];
            return { [name]: { ...section, entries: entries.filter((entry) => entry.id !== id) } };
          });
        }),
      );
    };

    /**
     * Fetch fields for creating a new entry in any
     * finance section
     *
     * @param name
     * @returns
     */
    const fetchEntryFields$ = (name: SectionName): Observable<InputField[]> => {
      return http.fetchEntryFields$(name);
    };

    /**
     * Fetch fields for creating a new item
     * in finance entry
     *
     * @param name
     * @returns
     */
    const fetchFields$ = (name: SectionName): Observable<InputField[]> => {
      return http.fetchFields$(name);
    };

    return {
      _reset,
      fetchEntries,
      addEntry$,
      fetchEntryFields$,
      fetchFields$,
      removeEntry$,
    };
  }),
  withUserReset(),
);
