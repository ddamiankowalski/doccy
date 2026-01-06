import { signalStore, withState } from '@ngrx/signals';

type User = {};

type UserState = {
  user: User | null;
};

const initialState: UserState = {
  user: null,
};

export const UserStore = signalStore({ providedIn: 'root' }, withState(initialState));
