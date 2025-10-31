import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAutoFocusFirstInput]',
  standalone: true,
})
export class AutoFocusFirstInputDirective implements AfterViewInit {
  constructor(private el: ElementRef) {}
  ngAfterViewInit(): void {
    const firstControl = this.el.nativeElement.querySelector('input,Select,textarea');
    if (firstControl) {
      setTimeout(() => {
        firstControl.focus();
        firstControl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 0);
    }
  }
}
