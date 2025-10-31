import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-genericsnackbarcomponent',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './genericsnackbarcomponent.html',
  styleUrl: './genericsnackbarcomponent.scss',
})
export class CustomSnackbarComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    private snackBarRef: MatSnackBarRef<CustomSnackbarComponent>
  ) {}
  close() {
    this.snackBarRef.dismiss();
  }
}
