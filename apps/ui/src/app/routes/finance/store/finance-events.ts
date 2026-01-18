import { type } from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';
import { SectionName } from './finance.store';

/**
 * All finance events
 */
export const financeEvents = eventGroup({
  source: 'FinanceStore',
  events: {
    recordUpdate: type<{ id: string; entryId: string; section: SectionName }>(),
  },
});
