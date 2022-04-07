import { createReducer, on } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { IncomeExpense } from '../../models/income-expense.model';
import { setItems, unsetItems } from '../actions/income-expense.actions';

export interface IncomeExpenseState {
  incomeExpenses: IncomeExpense[];
}

export interface AppStateIncome extends AppState {
  incomeExpensesState: IncomeExpenseState
}

export const initialState: IncomeExpenseState = {
  incomeExpenses: [],
};

export const IncomeExpenseReducer = createReducer(
  initialState,
  on(setItems, (state, { incomeExpenses }) => ({ ...state, incomeExpenses: incomeExpenses})),
  on(unsetItems, (state) => ({ ...state, incomeExpenses: [] }))
);
