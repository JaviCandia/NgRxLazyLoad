import { createReducer, on } from '@ngrx/store';
import { User } from '../../models/user.model';
import { setUser, unsetUser } from '../actions/auth.actions';

export interface AuthState {
  user: User;
}

export const initialState: AuthState = {
  user: new Object() as User,
};

export const authReducer = createReducer(
  initialState,
  on(setUser, (state, { user }) => ({ ...state, user: { ...user } })),
  on(unsetUser, (state) => ({ ...state, user: new Object() as User }))
);
