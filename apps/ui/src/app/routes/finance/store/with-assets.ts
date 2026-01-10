import { patchState, signalStoreFeature, type, withMethods } from '@ngrx/signals';
import { removeAllEntities, withEntities } from '@ngrx/signals/entities';
import { FinanceSection, sectionState } from './finance.store';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { inject } from '@angular/core';
import { AssetsHttpService } from './assets-http.service';
import { switchMap } from 'rxjs';

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
      const http = inject(AssetsHttpService);

      /**
       * Resets all entities and state
       */
      const _resetAssets = () => {
        patchState(store, { assets: sectionState });
        patchState(store, removeAllEntities({ collection: 'stock' }));
      };

      const fetchAssetEntries = rxMethod<void>(switchMap(() => http.fetchEntries$()));

      const addAssetEntry = (model: Record<string, any>) => {
        console.log('adding entry', model);
      };

      return {
        _resetAssets,
        fetchAssetEntries,
        addAssetEntry,
      };
    }),
  );
