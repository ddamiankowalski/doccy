import { signalStore, withState } from '@ngrx/signals';

type FinanceState = {};

const initialState: FinanceState = {};

export const FinanceStore = signalStore({ providedIn: 'root' }, withState(initialState));
