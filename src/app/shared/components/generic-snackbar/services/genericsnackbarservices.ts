import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from '../components/genericsnackbarcomponent';

@Injectable({
  providedIn: 'root',
})
export class GenericSnackbarServices {
  constructor(private snackbar: MatSnackBar) {}
  success(message: string) {
    this.open(message, 'success');
  }
  error(message: string) {
    this.open(message, 'error');
  }

  warning(message: string) {
    this.open(message, 'warning');
  }
  private open(message: string, type: string) {
    this.snackbar.openFromComponent(CustomSnackbarComponent, {
      data: { message, type },
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['no-padding-snackbar'],
    });
  }
}
