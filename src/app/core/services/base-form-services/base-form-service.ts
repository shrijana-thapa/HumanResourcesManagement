import { Injectable } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup } from '@angular/forms';
import { disableControls, enableControls, resetControls } from '@utils/form.utils';
@Injectable({
  providedIn: 'root',
})
export abstract class BaseFormService {
  #formGroup?: FormGroup;
  protected constructor(protected formBuilder: FormBuilder) {}

  get form(): FormGroup | undefined {
    return this.#formGroup;
  }
  set form(formGroup: FormGroup | undefined) {
    this.#formGroup = formGroup;
  }

  reset(): void {
    this.form?.reset();
  }

  hardReset(): void {
    this.form = undefined;
  }

  buildForm<T extends object>(config: T, options?: AbstractControlOptions | null): FormGroup {
    this.form = this.formBuilder.group(config, options);
    return this.form;
  }
  disableControls(controls: string[] | string): void {
    if (!this.form) {
      return;
    }
    disableControls(this.form, controls);
  }

  enableControls(controls: string[] | string): void {
    if (!this.form) {
      return;
    }
    enableControls(this.form, controls);
  }

  resetControls(controls: string[] | string): void {
    if (!this.form) {
      return;
    }
    resetControls(this.form, controls);
  }

  checkInvalidStatus(): boolean {
    this.applyTouchAndDirtyToForm();
    return this.form?.invalid ?? false;
  }

  applyTouchAndDirtyToForm(): void {
    this.form?.markAllAsTouched();
    this.form?.markAsDirty();
  }

  getFormValue<T>(): T {
    return this.form?.value satisfies T;
  }

  getRawFormValue<T>(): T {
    return this.form?.getRawValue() satisfies T;
  }

  resetForm(): void {
    this.form = new FormGroup({});
  }
}
