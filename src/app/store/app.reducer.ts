import { ActionReducerMap } from '@ngrx/store';
import { authReducer, AuthState } from './reducers/auth.reducer';
import { UiState, uiReducer } from './reducers/ui.reducer';

export interface AppState {
  ui: UiState;
  auth: AuthState;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: uiReducer,
  auth: authReducer,
};
