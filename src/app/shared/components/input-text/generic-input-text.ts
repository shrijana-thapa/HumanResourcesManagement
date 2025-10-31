import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-generic-input-text',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, CommonModule],
  templateUrl: './generic-input-text.html',
  styleUrls: ['./generic-input-text.scss'],
})
export class GenericInputTextComponent {
  @Input() label: string = '';
  @Input() type: string = '';
  @Input() placeholder: string = 'text';
  @Input() control?: FormControl;
  @Output() inputTextChanged = new EventEmitter<string>();

  getErrorMessage(): string {
    if (!this.control) return '';
    if (this.control.hasError('required')) {
      return `${this.label} is required`;
    }
    return '';
  }
}
