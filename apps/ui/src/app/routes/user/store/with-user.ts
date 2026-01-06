import { inject } from '@angular/core';
import { signalStoreFeature, type } from '@ngrx/signals';
import { Events, withEventHandlers } from '@ngrx/signals/events';
import { logout } from './user.events';
import { tap } from 'rxjs';

/**
 * Allows to clear the store when logout event is emitted
 *
 * @returns
 */
export const withUser = <_>() =>
  signalStoreFeature(
    {
      methods: type<{ _reset(): void }>(),
    },
    withEventHandlers((store, events = inject(Events)) => ({
      onReset$: events.on(logout).pipe(tap(() => store._reset())),
    }))
  );
