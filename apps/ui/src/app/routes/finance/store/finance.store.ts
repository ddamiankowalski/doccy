import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { withUser } from '../../user/store/with-user';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { switchMap } from 'rxjs';
import { inject } from '@angular/core';
import { FinanceHttpService } from './finance-http.service';
import { tapResponse } from '@ngrx/operators';
import { Asset, Section, SectionFields, SectionType } from './type';
import { FormModel, InputField } from '../../../ui/input/input-form/type';

type FinanceState = {
  assets: Section<Asset>;
  liabilities: Section<Asset>;
  income: Section<Asset>;
};

const sectionFieldsState: SectionFields = {
  error: false,
  loading: false,
  metadata: [],
};

const initialSectionState = {
  entries: [],
  error: false,
  loading: false,
  fields: sectionFieldsState,
};

const initialState: FinanceState = {
  assets: initialSectionState,
  liabilities: initialSectionState,
  income: initialSectionState,
};

export const FinanceStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => {
    const http = inject(FinanceHttpService);

    const fetchFields = rxMethod<SectionType>(
      switchMap((type) => {
        const patchFields = (fields: SectionFields) => {
          patchState(store, (state) => {
            const section = state[type];
            return { [type]: { ...section, fields } };
          });
        };

        patchFields({ ...sectionFieldsState, loading: true });
        return http.fetchFields$(type).pipe(
          tapResponse({
            next: ({ fields: metadata }) => patchFields({ ...sectionFieldsState, metadata }),
            error: () => patchFields({ ...sectionFieldsState, error: true }),
          })
        );
      })
    );

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
      fetchFields,
      fetchAssets,
      _reset,
    };
  }),
  withUser()
);
