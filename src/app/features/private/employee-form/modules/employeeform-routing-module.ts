import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeFormComponent } from '../components/employeeform';
import { canDeactivateGuard } from 'app/core/guards/forms/employee-form-deactivate-guard';
const routes: Routes = [
  { path: 'add', component: EmployeeFormComponent },
  {
    path: 'edit/:id',
    component: EmployeeFormComponent,
    canDeactivate: [canDeactivateGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeformRoutingModule {}
