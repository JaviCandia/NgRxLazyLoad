import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { IncomeExpensesComponent } from './income-expenses/income-expenses.component';
import { StatisticComponent } from './statistic/statistic.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'dashboard', component: StatisticComponent },
      { path: 'income-expenses', component: IncomeExpensesComponent },
      { path: 'details', component: DetailsComponent },
      { path: '**', redirectTo: 'dashboard' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
