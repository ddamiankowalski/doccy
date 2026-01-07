import { type } from '@ngrx/signals';
import { event } from '@ngrx/signals/events';
import { Asset } from './type';

/**
 * Emitted when finance record is added
 */
export const added = event('[FinanceStore] Entry added', type<Asset>());
