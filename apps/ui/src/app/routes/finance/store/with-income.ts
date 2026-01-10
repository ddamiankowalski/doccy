import { patchState, signalStoreFeature, type, withMethods, withState } from '@ngrx/signals';
import { removeAllEntities, withEntities } from '@ngrx/signals/entities';
import { FinanceSection, sectionState } from './finance.store';

export type Salary = {
  uuid: string;
};

type IncomeSectionState = {
  income: {
    loading: boolean;
    total: number;
  };
};

const initialState: IncomeSectionState = {
  income: {
    total: 0,
    loading: true,
  },
};

/**
 * Income store delegate
 *
 * @returns
 */
export const withIncome = <_>() =>
  signalStoreFeature(
    { state: type<{ income: FinanceSection }>() },
    withState(initialState),
    /**
     * Salary entities
     */
    withEntities({
      collection: 'salary',
      entity: type<Salary>(),
    }),
    withMethods((store) => {
      /**
       * Resets all entities and state
       */
      const _resetIncome = () => {
        patchState(store, { income: sectionState });
        patchState(store, removeAllEntities({ collection: 'salary' }));
      };

      return {
        _resetIncome,
      };
    }),
  );
