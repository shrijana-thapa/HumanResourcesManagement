import { FormGroup } from '@angular/forms';
export function disableControls(form: FormGroup, controls?: string | string[]): void {
  if (!controls) return;
  const controlsArray = Array.isArray(controls) ? controls : [controls];

  controlsArray.forEach((name) => {
    const control = form.get(name);
    if (control) control.disable();
  });
}

export function enableControls(form: FormGroup, controls?: string | string[]) {
  if (!controls) return;
  const controlsArray = Array.isArray(controls) ? controls : [controls];
  controlsArray.forEach((name) => {
    const control = form.get(name);
    if (control) control.enable();
  });
}
export function resetControls(form: FormGroup, controls?: string[] | string): void {
  if (!controls) return;
  const controlsArray = Array.isArray(controls) ? controls : [controls];
  controlsArray.forEach((name) => {
    const control = form.get(name);
    if (control) control.reset();
  });
}
