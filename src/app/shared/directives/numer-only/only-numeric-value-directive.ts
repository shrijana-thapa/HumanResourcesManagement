import { Directive, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appOnlyNumericValue]',
  standalone: true,
})
export class OnlyNumericValueDirective {
  @Input() allowDecimal: boolean = false;

  constructor(private control: NgControl) {}

  @HostListener('input', ['$event'])
  onInput(event: any) {
    let value = event.target.value;

    const regex = this.allowDecimal ? /[^0-9.]/g : /[^0-9]/g;
    value = value.replace(regex, '');

    if (this.allowDecimal) {
      const parts = value.split('.');
      if (parts.length > 2) {
        value = parts[0] + '.' + parts[1];
      }
    }
    event.target.value = value;

    if (this.control?.control) {
      this.control.control.setValue(value, { emitEvent: false });
    }
  }
}
