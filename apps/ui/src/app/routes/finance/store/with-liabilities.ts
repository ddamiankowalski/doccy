import { patchState, signalStoreFeature, type, withMethods, withState } from '@ngrx/signals';
import { removeAllEntities, withEntities } from '@ngrx/signals/entities';
import { FinanceSection, sectionState } from './finance.store';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tap } from 'rxjs';

export type Payment = {
  uuid: string;
};

type LiabilitiesSectionState = {
  liabilities: {
    loading: boolean;
    total: number;
  };
};

const initialState: LiabilitiesSectionState = {
  liabilities: {
    total: 0,
    loading: true,
  },
};

/**
 * Liabilities store delegate
 *
 * @returns
 */
export const withLiabilities = <_>() =>
  signalStoreFeature(
    { state: type<{ liabilities: FinanceSection }>() },
    withState(initialState),
    /**
     * Payment entities
     */
    withEntities({
      collection: 'payment',
      entity: type<Payment>(),
    }),
    withMethods((store) => {
      /**
       * Resets all entities and state
       */
      const _resetLiabilities = () => {
        patchState(store, { liabilities: sectionState });
        patchState(store, removeAllEntities({ collection: 'payment' }));
      };

      return {
        _resetLiabilities,
      };
    }),
  );
