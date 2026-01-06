import { type } from '@ngrx/signals';
import { event } from '@ngrx/signals/events';

/**
 * Emitted when user is logged out
 */
export const logout = event('[UserEvent] Logged Out', type<void>());
