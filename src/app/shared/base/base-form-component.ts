import { FormBuilder, FormGroup } from '@angular/forms';

export abstract class BaseForm {
  form!: FormGroup;
  isSubmitting = false;
  errorMessage: string | null = null;
  constructor(protected fb: FormBuilder) {
    this.form = this.buildForm();
  }
  //buid form
  protected abstract buildForm(): FormGroup;
  //resetform
  resetForm(): void {
    this.form.reset();
  }
  markAllAsTouched(): void {
    Object.values(this.form.controls).forEach((control) => control.markAsTouched());
  }
  submitForm(): void {
    if (this.form.valid) {
      this.isSubmitting = true;
      this.onSubmit(this.form.value);
      this.isSubmitting = false;
    } else {
      this.markAllAsTouched();
    }
  }
  protected abstract onSubmit(formValue: any): void;
}
