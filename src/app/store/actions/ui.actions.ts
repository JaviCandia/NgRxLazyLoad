import { createAction } from '@ngrx/store';

export const isLoading = createAction('[UI] Is Loading');

export const stopLoading = createAction('[UI] Stop Loading');
