import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IncomeExpense } from 'src/app/models/income-expense.model';
import { ChartData, ChartType } from 'chart.js';
import { AppStateIncome } from '../../store/reducers/income-expense.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styles: [],
})
export class StatisticComponent implements OnInit, OnDestroy {
  incomes: number = 0;
  expenses: number = 0;
  totalIncomes: number = 0;
  totalExpenses: number = 0;
  incomeSubscription!: Subscription;

  // Doughnut
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: ['Ingresos', 'Gastos'],
    datasets: [{ data: [350, 450] }],
  };

  constructor(private store: Store<AppStateIncome>) {}

  ngOnInit(): void {
    this.incomeSubscription = this.store.select('incomeExpensesState').subscribe(( {incomeExpenses} ) => {
      this.generateStats(incomeExpenses);
    });
  }

  generateStats(incomeExpenses: IncomeExpense[]) {
    this.incomes = 0;
    this.expenses = 0;
    this.totalIncomes = 0;
    this.totalExpenses = 0;

    incomeExpenses.forEach((item) => {
      if (item.type === 'ingreso') {
        this.totalIncomes += item.amount;
        this.incomes++;
      } else {
        this.totalExpenses += item.amount;
        this.expenses++;
      }
    });

    this.doughnutChartData.datasets = [
      {
        data: [this.totalIncomes, this.totalExpenses],
        backgroundColor: ['#00B0FF', '#F50057'],
        hoverBackgroundColor: ['#00E5FF', '#FF1744'],
        hoverBorderColor: ['#00E5FF', '#FF1744'],
      },
    ];
  }

  ngOnDestroy() {
    this.incomeSubscription.unsubscribe();
  }
}
