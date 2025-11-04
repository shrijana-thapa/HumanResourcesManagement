import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { employeeFormDeactivateGuard } from './employee-form-deactivate-guard';

describe('employeeFormDeactivateGuard', () => {
  const executeGuard: CanDeactivateFn<unknown> = (...guardParameters) => 
      TestBed.runInInjectionContext(() => employeeFormDeactivateGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
