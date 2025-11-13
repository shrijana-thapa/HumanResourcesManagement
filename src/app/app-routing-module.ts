import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './features/private/layout/layout-component';

// app-routing.module.ts
const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: '',
    component: LayoutComponent,
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('../app/features/private/user-dashboard/modules/userdashboard-module').then(
        (m) => m.UserdashboardModule
      ),
  },
  {
    path: 'app',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('../app/features/private/user-dashboard/modules/userdashboard-module').then(
            (m) => m.UserdashboardModule
          ),
      },
    ],
  },
  {
    path: 'addForm',
    loadChildren: () =>
      import('../app/features/private/employee-form/modules/employeeform-module').then(
        (m) => m.EmployeeformModule
      ),
  },
  // {
  //   path: 'login',
  //   component: LoginComponent,
  // },
  // {
  //   path: 'signup',
  //   component: SignupComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
