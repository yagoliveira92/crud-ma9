import { CriarComponent } from './criar/criar.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'criar', component: CriarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
