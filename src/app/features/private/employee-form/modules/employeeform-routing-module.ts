import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeFormComponent } from '../components/employeeform';
import { canDeactivateGuard } from 'app/core/guards/forms/employee-form-deactivate-guard';
import { EmployeeDetailsComponent } from '../../employee-details/employeedetails-component';
const routes: Routes = [
  { path: 'add', component: EmployeeFormComponent },
  {
    path: 'edit/:id',
    component: EmployeeFormComponent,
    canDeactivate: [canDeactivateGuard],
  },
  {
    path: 'view/:id',
    component: EmployeeDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeformRoutingModule {}
