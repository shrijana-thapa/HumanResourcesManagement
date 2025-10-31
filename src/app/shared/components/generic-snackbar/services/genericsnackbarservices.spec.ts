import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenericSnackbarServices } from './genericsnackbarservices';
import { CustomSnackbarComponent } from '../components/genericsnackbarcomponent';

describe('GenericSnackbarServices', () => {
  let service: GenericSnackbarServices;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['openFromComponent']);

    TestBed.configureTestingModule({
      providers: [GenericSnackbarServices, { provide: MatSnackBar, useValue: snackBarSpy }],
    });

    service = TestBed.inject(GenericSnackbarServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open success snackbar', () => {
    service.success('SUCCESS_MESSAGE');

    expect(snackBarSpy.openFromComponent).toHaveBeenCalledWith(
      CustomSnackbarComponent,
      jasmine.objectContaining({
        data: { message: 'SUCCESS_MESSAGE', type: 'success' },
      })
    );
  });

  it('should open error snackbar', () => {
    service.error('ERROR_MESSAGE');

    expect(snackBarSpy.openFromComponent).toHaveBeenCalledWith(
      CustomSnackbarComponent,
      jasmine.objectContaining({
        data: { message: 'ERROR_MESSAGE', type: 'error' },
      })
    );
  });

  it('should open warning snackbar', () => {
    service.warning('WARNING_MESSAGE');

    expect(snackBarSpy.openFromComponent).toHaveBeenCalledWith(
      CustomSnackbarComponent,
      jasmine.objectContaining({
        data: { message: 'WARNING_MESSAGE', type: 'warning' },
      })
    );
  });
});
