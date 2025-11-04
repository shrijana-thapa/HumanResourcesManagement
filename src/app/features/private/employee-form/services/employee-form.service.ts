import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BaseFormService } from 'app/core/services/base-form-services/base-form-service';
import { EMPLOYEE } from 'app/shared/model/employees-model';
import { pngFileValidator, sizeFileValidator } from '../file-validators/file-validators';
import { AmountValidator } from 'app/core/validators/amount-validator';
import { patchFormArray } from '@utils/form-array-utils';
type OptionType = { value: string | number; label: string };
@Injectable({
  providedIn: 'root',
})
export class EmployeeFormService extends BaseFormService {
  constructor(protected override formBuilder: FormBuilder) {
    super(formBuilder);
  }
  initForm() {
    this.buildForm({
      id: [null],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      department: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(0)]],

      status: ['', Validators.required],
      joiningDate: ['', Validators.required],
      profilePhoto: [null, [pngFileValidator(), sizeFileValidator(1)]],
      skills: this.formBuilder.array([]),
      incomes: this.formBuilder.array([], {
        validators: [AmountValidator.amountHierarchyValidator],
      }),
    });
  }
  createAmount(): FormGroup {
    return this.formBuilder.group({
      frequency: ['', Validators.required],
      interval: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(1)]],
    });
  }
  get incomes(): FormArray {
    return this.form?.get('incomes') as FormArray;
  }
  addAmount() {
    this.incomes.push(this.createAmount());
    this.incomes.updateValueAndValidity();
  }
  amountFrequencies: OptionType[] = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
  ];

  amountIntervals: OptionType[] = [
    { label: 'Daily', value: 'daily' },
    { label: 'Weekly', value: 'weekly' },
    { label: 'Monthly', value: 'monthly' },
    { label: 'Yearly', value: 'yearly' },
  ];
  removeAmount(index: number) {
    this.incomes.removeAt(index);
    this.incomes.updateValueAndValidity();
  }
  getSelectedValue<T>(arrayName: string, controlName: string, currentIndex: number): T[] {
    const selected: T[] = [];
    const formArray = this.form?.get(arrayName) as FormArray;
    formArray.controls.forEach((control, index) => {
      if (index !== currentIndex) {
        const value = control.get(controlName)?.value;
        if (value !== null && value !== undefined && value !== '') {
          selected.push(value);
        }
      }
    });
    return selected;
  }
  getAvailableOptions<T extends number | string>(allOptions: OptionType[], selectedValue: T[]) {
    return allOptions.filter((option) => !selectedValue.includes(option.value as T));
  }

  getAvailableFrequencyOptions(index: number): OptionType[] {
    const selectedFrequency = this.getSelectedValue<number>('incomes', 'frequency', index);
    return this.getAvailableOptions(this.amountFrequencies, selectedFrequency);
  }
  getAvailableIntervalsOptions(index: number): OptionType[] {
    const selectedInterval = this.getSelectedValue<string>('incomes', 'interval', index);
    return this.getAvailableOptions(this.amountIntervals, selectedInterval);
  }
  getIncomeErrorMessage(index: number): string | null {
    const incomeControl = this.incomes.at(index);
    const amountControl = incomeControl.get('amount');
    return amountControl?.hasError('invalidIncomeHierarchy')
      ? amountControl.getError('invalidIncomeHierarchy')
      : null;
  }

  createSkills(): FormGroup {
    return this.formBuilder.group({
      skillName: ['', Validators.required],
      experience: ['', [Validators.required, Validators.min(0)]],
      level: ['', Validators.required],
    });
  }
  get skills(): FormArray {
    return this.form?.get('skills') as FormArray;
  }
  addSkills() {
    this.skills.push(this.createSkills());
  }
  removeSkills(index: number): void {
    this.skills.removeAt(index);
  }
  override getFormValue<EMPLOYEE>(): EMPLOYEE {
    return super.getFormValue<EMPLOYEE>();
  }
  get nameControl(): FormControl | null {
    return this.form ? (this.form.get('name') as FormControl | null) : null;
  }
  get emailControl(): FormControl | null {
    return this.form ? (this.form.get('email') as FormControl | null) : null;
  }

  get roleControl(): FormControl | null {
    return this.form ? (this.form.get('role') as FormControl | null) : null;
  }

  get departmentControl(): FormControl | null {
    return this.form ? (this.form.get('department') as FormControl | null) : null;
  }
  get salaryControl(): FormControl | null {
    return this.form ? (this.form.get('salary') as FormControl | null) : null;
  }

  get statusControl(): FormControl | null {
    return this.form ? (this.form.get('status') as FormControl | null) : null;
  }
  get joiningDateControl(): FormControl | null {
    return this.form ? (this.form?.get('joiningDate') as FormControl | null) : null;
  }
  get profilePhotoControl() {
    return this.form ? (this.form?.get('profilePhoto') as FormControl | null) : null;
  }
  getSkillNameControl(skill: AbstractControl): FormControl {
    return skill.get('skillName') as FormControl;
  }

  getSkillExperienceControl(skill: AbstractControl): FormControl {
    return skill.get('experience') as FormControl;
  }

  getSkillLevelControl(skill: AbstractControl): FormControl {
    return skill.get('level') as FormControl;
  }
  skillLevels = [
    { label: 'Beginner', value: 'Beginner' },
    { label: 'Intermediate', value: 'Intermediate' },
    { label: 'Expert', value: 'Expert' },
  ];
  getAmountFrequencyControl(income: AbstractControl): FormControl {
    return income.get('frequency') as FormControl;
  }
  getAmountIntervalControl(income: AbstractControl): FormControl {
    return income.get('interval') as FormControl;
  }
  getAmountValueControl(income: AbstractControl): FormControl {
    return income.get('amount') as FormControl;
  }

  patchEmployeeForm(employee: EMPLOYEE) {
    if (!employee || !this.form) return;
    this.form.patchValue(employee);
    if (employee.skills) {
      patchFormArray(this.skills, employee.skills, this.createSkills.bind(this));
    }
    if (employee.incomes) {
      patchFormArray(this.incomes, employee.incomes, this.createAmount.bind(this));
    }
  }
}
