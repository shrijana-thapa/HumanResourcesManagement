import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { OnlyNumericValueDirective } from 'app/shared/directives/numer-only/only-numeric-value-directive';

@Component({
  selector: 'app-generic-inputNumber',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, OnlyNumericValueDirective],
  templateUrl: './genericnumbercomponent.html',
  styleUrl: './genericnumbercomponent.scss',
})
export class GenericInputNumber {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() control!: FormControl;
  @Input() min?: number;
  @Input() allowDecimal = false;
}
