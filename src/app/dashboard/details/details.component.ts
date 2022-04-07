import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IncomeExpense } from 'src/app/models/income-expense.model';
import { IncomeExpenseService } from 'src/app/services/income-expense.service';
import Swal from 'sweetalert2';
import { AppStateIncome } from '../../store/reducers/income-expense.reducer';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styles: [],
})
export class DetailsComponent implements OnInit, OnDestroy {
  incomeExpenses: IncomeExpense[] = [];
  incomeSubscription!: Subscription;
  authSubscription!: Subscription;
  userId: string = '';

  constructor(private store: Store<AppStateIncome>, private incomeExpenseService: IncomeExpenseService) {}

  ngOnInit(): void {
    this.incomeSubscription = this.store.select('incomeExpensesState').subscribe(({ incomeExpenses }) => (this.incomeExpenses = incomeExpenses));
    this.authSubscription = this.store.select('auth').subscribe(({user}) => this.userId = user.uid!);
  }

  delete(itemId: string){
    this.incomeExpenseService.deleteIncomeExpense(this.userId, itemId)
      .then(() => Swal.fire('Eliminado', 'Elemento Eliminado correctamente', 'success'))
      .catch(({message}) => Swal.fire('Error', message, 'error'));
  }

  ngOnDestroy() {
    this.incomeSubscription.unsubscribe();
    this.authSubscription.unsubscribe();
  }
}
