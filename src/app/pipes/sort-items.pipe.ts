import { Pipe, PipeTransform } from '@angular/core';
import { IncomeExpense } from '../models/income-expense.model';

@Pipe({
  name: 'sortItems'
})
export class SortItemsPipe implements PipeTransform {

  transform(incomeExpenses: IncomeExpense[]): IncomeExpense[] {
    return incomeExpenses.slice().sort((a,b) => {
      return a.type > b.type ? -1 : 1;
    });
  }

}
