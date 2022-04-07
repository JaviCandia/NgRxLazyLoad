import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { AppState } from '../../store/app.reducer';
import { IncomeExpenseService } from '../../services/income-expense.service';
import { isLoading, stopLoading } from '../../store/actions/ui.actions';

@Component({
  selector: 'app-income-expenses',
  templateUrl: './income-expenses.component.html',
  styles: [],
})
export class IncomeExpensesComponent implements OnInit, OnDestroy {
  authSubscription!: Subscription;
  uiSubscription!: Subscription;
  type: string = 'ingreso';
  uid: string = '';
  isLoading: boolean = false;

  incomeForm: FormGroup = this.fb.group({
    description: ['', Validators.required],
    amount: [0, Validators.required],
    type: ['ingreso', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private incomeExpenseService: IncomeExpenseService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.store.select('auth').subscribe(({ user }) => {
      this.uid = user.uid!;
    });

    this.uiSubscription = this.store.select('ui').subscribe(({ isLoading }) => {
      this.isLoading = isLoading;
    });
  }

  save() {
    if(this.incomeForm.invalid){
      return;
    }
    
    this.store.dispatch(isLoading());
    this.incomeForm.controls['type'].setValue(this.type);

    this.incomeExpenseService.createIncomeExpense(this.incomeForm.value, this.uid)
      .then(() => {
        Swal.fire('Registro creado!', this.incomeForm.get('description')?.value, 'success');
        this.store.dispatch(stopLoading());
        this.incomeForm.reset({ type: [''] });
      })
      .catch((error) => {
        this.store.dispatch(stopLoading());
        Swal.fire('Error!', error.message, 'error');
      });
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
    this.uiSubscription.unsubscribe();
  }
}
