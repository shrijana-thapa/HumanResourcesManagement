import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function pngFileValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const file = control.value;
    if (!file) return null;
    const typeValid = file.type?.toLowerCase() === 'image/png';
    const extensionValid = file.name?.toLowerCase().endsWith('.png');
    const isValid = typeValid || extensionValid;
    return isValid ? null : { invalidType: true };
  };
}
export function sizeFileValidator(maxMB: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const file = control.value;
    if (!file) return null;
    const maxSize = maxMB * 1024 * 1024;
    const isValid = file.size <= maxSize;
    return isValid ? null : { fileTooLarge: true };
  };
}
