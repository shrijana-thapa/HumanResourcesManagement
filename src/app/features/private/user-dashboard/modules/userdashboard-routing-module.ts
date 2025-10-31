import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from '../components/userdashboardcomponent/userdashboardcomponent';

const routes: Routes = [
  {
    path: '',
    component: UserDashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserdashboardRoutingModule {}
