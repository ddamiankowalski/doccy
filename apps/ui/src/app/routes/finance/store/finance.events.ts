import { type } from '@ngrx/signals';
import { event } from '@ngrx/signals/events';
import { Asset, SectionType } from './type';

/**
 * Emitted when finance record is added
 */
export const added = event('[FinanceStore] Entry added', type<{ entry: any; type: SectionType }>());
