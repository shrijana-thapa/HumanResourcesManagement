import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-generic-inputselect',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatSelectModule, CommonModule],
  templateUrl: './genericinputselect.html',
  styleUrls: ['./genericinputselect.scss'],
})
export class GenericInputSelect {
  @Input() label: string = '';
  @Input() placeholder: string = 'select an option';
  @Input() options: { label: string; value: string | number }[] = [];
  @Input() control!: FormControl;
}
