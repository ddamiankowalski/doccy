import { patchState, signalStoreFeature, type, withMethods } from '@ngrx/signals';
import { removeAllEntities, withEntities } from '@ngrx/signals/entities';
import { FinanceSection, sectionState } from './finance.store';

export type Stock = {
  uuid: string;
};

/**
 * Assets store delegate
 *
 * @returns
 */
export const withAssets = <_>() =>
  signalStoreFeature(
    { state: type<{ assets: FinanceSection }>() },
    /**
     * Stock entities
     */
    withEntities({
      collection: 'stock',
      entity: type<Stock>(),
    }),
    withMethods((store) => {
      /**
       * Resets all entities and state
       */
      const _resetAssets = () => {
        patchState(store, { assets: sectionState });
        patchState(store, removeAllEntities({ collection: 'stock' }));
      };

      return {
        _resetAssets,
      };
    }),
  );
