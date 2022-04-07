import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import { AppState } from '../../store/app.reducer';
import { setItems } from '../../store/actions/income-expense.actions';
import { IncomeExpenseService } from '../../services/income-expense.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styles: [],
})
export class MainComponent implements OnInit, OnDestroy {
  authSubscription!: Subscription;
  incomeSubscription!: Subscription;

  constructor(
    private store: Store<AppState>,
    private incomeExpenseService: IncomeExpenseService
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.store.select('auth')
      .pipe(filter(({ user }) => Object.keys(user).length !== 0))
      .subscribe(({ user }) => {
        this.incomeSubscription = this.incomeExpenseService.initIncomeExpenseListener(user.uid!)
          .subscribe((items) => {
            this.store.dispatch(setItems({ incomeExpenses: items }));
          });
      });
  }

  ngOnDestroy(): void {
    this.incomeSubscription.unsubscribe();
    this.authSubscription.unsubscribe();
  }
}
