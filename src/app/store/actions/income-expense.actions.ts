import { createAction, props } from '@ngrx/store';
import { IncomeExpense } from '../../models/income-expense.model';

export const setItems = createAction(
  '[Income-Expense] Set Items',
  props<{ incomeExpenses: IncomeExpense[] }>()
);

export const unsetItems = createAction('[Income-Expense] Unset Items');
