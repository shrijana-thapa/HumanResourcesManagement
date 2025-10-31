import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from 'app/shared/material-module/material-module';
export interface DialogConfig {
  title?: string;
  message?: string;
  width?: string;
  height?: string;
  showCancelButton?: boolean;
  showConfirmButton?: boolean;
  cancelButtonText?: string;
  confirmButtonText?: string;
  cancelColor?: string;
  confirmColor?: string;
}

@Component({
  selector: 'app-genericdialogbox',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './genericdialogbox.html',
  styleUrl: './genericdialogbox.scss',
})
export class GenericDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<GenericDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public config: DialogConfig
  ) {}
  onCancel(): void {
    this.dialogRef.close(false);
  }
  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
