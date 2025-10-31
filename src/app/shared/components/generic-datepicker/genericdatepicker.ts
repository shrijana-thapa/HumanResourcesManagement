import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-generic-datepicker',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatDatepickerModule, MatInputModule],
  templateUrl: './genericdatepicker.html',
  styleUrl: './genericdatepicker.scss',
})
export class GenericDatePicker {
  @Input() label!: string;
  @Input() placeholder: string = '';
  @Input() control!: FormControl;
  @Output() dateChanged = new EventEmitter<Date>();

  getErrorMessage(): string {
    if (this.control.hasError('required')) {
      return `${this.label} is required`;
    }
    if (this.control.hasError('matDatepickerParse')) {
      return `Invalid date format`;
    }
    return 'Invalid value';
  }
}
