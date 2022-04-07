import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NgChartsModule } from 'ng2-charts';
import { SortItemsPipe } from '../pipes/sort-items.pipe';

import { MainComponent } from './main/main.component';
import { StatisticComponent } from './statistic/statistic.component';
import { DetailsComponent } from './details/details.component';
import { IncomeExpensesComponent } from './income-expenses/income-expenses.component';
import { StoreModule } from '@ngrx/store';
import { IncomeExpenseReducer } from '../store/reducers/income-expense.reducer';

// TODO: Este debe ser el modulo principal del dashboard
@NgModule({
  declarations: [
    MainComponent,
    StatisticComponent,
    DetailsComponent,
    IncomeExpensesComponent,
    SortItemsPipe,
  ],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature('incomeExpensesState', IncomeExpenseReducer),
    DashboardRoutingModule,
    ReactiveFormsModule,
    NgChartsModule
  ],
})
export class DashboardModule {}
