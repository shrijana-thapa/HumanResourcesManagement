export interface canComponentDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { EmployeeFormComponent } from 'app/features/private/employee-form/components/employeeform';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class canDeactivateGuard implements CanDeactivate<canComponentDeactivate> {
  canDeactivate(component: EmployeeFormComponent): Observable<boolean> | boolean {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
