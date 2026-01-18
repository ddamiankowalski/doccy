import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { withUserReset } from '../../user/store/with-user';
import { withAssets } from './with-assets';
import { withLiabilities } from './with-liabilities';
import { withIncome } from './with-income';
import { catchError, EMPTY, mergeMap, Observable, switchMap, tap } from 'rxjs';
import { InputField } from '../../../ui/input/input-form/type';
import { inject } from '@angular/core';
import { FinanceHttpService, Response } from './finance-http.service';
import { NotificationService } from '../../../ui/notification/services/notification.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Events, injectDispatch, on, withEventHandlers, withReducer } from '@ngrx/signals/events';
import { financeEvents } from './finance-events';

export type SectionName = 'assets' | 'liabilities' | 'income';

export type EntryName = string;

export type FinanceEntry = {
  id: string;
  section: SectionName;
  icon: string;
  type: string;
  name: string;
  profit?: Profit;
  value?: number;
  stocks?: Stock[];
  loading: boolean;
};

export type Profit = {
  daily: number;
  dailyPercentage: number;
  total: number;
};

export type Stock = {
  id: string;
  ticker: string;
  price: number;
  commission: number;
};

export type EntryRecord = {
  id: string;
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

    const dispatch = injectDispatch(financeEvents);

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
          tap((response) => {
            patchState(store, () => ({
              [name]: {
                error: false,
                loading: false,
                entries: response.map((res) => ({ ...res, loading: false })),
              },
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
    const addEntry$ = (name: SectionName, model: object) => {
      return http.addEntry$(name, model).pipe(
        catchError(() => {
          notification.error('ERROR_NOTIFICATION', 'ERROR_ADD_ENTRY');
          return EMPTY;
        }),
        tap((added) => {
          notification.success('SUCCESS_NOTIFICATION', 'SUCCESS_ADD_ENTRY');

          patchState(store, (state) => {
            const { entries, ...section } = state[name];
            return { [name]: { ...section, entries: [...entries, { ...added, loading: false }] } };
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
    const removeEntry$ = (name: SectionName, id: string): Observable<Response> => {
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
    const fetchFields$ = (name: SectionName, type: string): Observable<InputField[]> => {
      return http.fetchFields$(name, type);
    };

    /**
     * Adds record for a given section and entry
     *
     * @param section
     * @param type
     * @param model
     * @returns
     */
    const addEntryRecord$ = (
      section: SectionName,
      type: EntryName,
      entryId: string,
      model: object,
    ): Observable<any> => {
      return http.addEntryRecord$(section, type, entryId, model).pipe(
        catchError((err) => {
          notification.error('ERROR_NOTIFICATION', 'ERROR_ADD_ENTRY');
          throw err;
        }),
        tap(({ id }) => {
          notification.success('SUCCESS_NOTIFICATION', 'SUCCESS_ADD_RECORD');
          dispatch.recordUpdate({ entryId, id, section });
        }),
      );
    };

    /**
     * Fetches a single entry in a given section
     *
     * @param section
     * @param id
     * @returns
     */
    const fetchEntry$ = (section: SectionName, id: string) => {
      _updateEntry(id, section, { loading: true });

      return http.fetchEntry$(section, id).pipe(
        tap((response) => {
          const { id, section } = response;
          _updateEntry(id, section, { ...response, loading: false });
        }),
      );
    };

    const _updateEntry = (id: string, section: SectionName, patch: Partial<FinanceEntry>) => {
      patchState(store, (state) => {
        const { entries } = state[section];

        return {
          ...state,
          [section]: {
            ...state[section],
            entries: entries.map((entry) => {
              if (id === entry.id) {
                return { ...entry, ...patch };
              }

              return { ...entry };
            }),
          },
        };
      });
    };

    return {
      _reset,
      fetchEntries,
      addEntry$,
      fetchEntry$,
      fetchEntryFields$,
      fetchFields$,
      removeEntry$,
      addEntryRecord$,
    };
  }),
  withEventHandlers((store, events = inject(Events)) => {
    const { recordUpdate } = financeEvents;

    return {
      refreshEntry$: events
        .on(recordUpdate)
        .pipe(switchMap(({ payload }) => store.fetchEntry$(payload.section, payload.id))),
    };
  }),
  withUserReset(),
);
