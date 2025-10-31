import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive({
  selector: '[appAutoFocusFirstInvalidInput]',
  standalone: true,
})
export class AutoFocusFirstInvalidInputDirective {
  @Input('appAutoFocusFirstInvalidInput') formGroup?: FormGroup;
  constructor(private el: ElementRef) {}

  @HostListener('submit')
  onFormSubmit() {
    if (!this.formGroup) return;
    if (this.formGroup.invalid) {
      const firstInvalidControl: HTMLElement | null = this.el.nativeElement.querySelector(
        'input.ng-invalid, select.ng-invalid, textarea.ng-invalid'
      );
      if (firstInvalidControl) {
        firstInvalidControl.focus();
        firstInvalidControl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }
}
