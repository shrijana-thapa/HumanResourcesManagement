import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EmployeeFormService } from '../services/employee-form.service';
import { EMPLOYEE } from 'app/shared/model/employees-model';
import { EmployeeService } from 'app/core/services/employee-services/employee-service';
import { TranslateService } from '@ngx-translate/core';
import { AmountValidator } from 'app/core/validators/amount-validator';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-employeeform',
  standalone: false,
  templateUrl: './employeeform.html',
  styleUrls: ['./employeeform.scss'],
})
export class EmployeeFormComponent implements OnInit {
  previewUrl: string | null = '';
  selectedFile: File | null = null;
  employee: any;

  constructor(
    public formService: EmployeeFormService,
    private employeeService: EmployeeService,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.formService.initForm(); // Build form
    this.formService.incomes.valueChanges.subscribe(() => {
      this.formService.incomes.updateValueAndValidity({ onlySelf: true, emitEvent: false });
    });
  }

  onDateChange(date: Date) {
    console.log('Selected date:', date);
  }
  onSubmit() {
    if (this.formService.checkInvalidStatus()) return;

    const formData: EMPLOYEE = this.formService.getFormValue();

    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        formData.profilePhoto = reader.result as string;
        this.employeeService.addEmployee(formData).subscribe({
          next: () => {
            console.log(' Employee added successfully with photo!');
            this.formService.reset();
            this.previewUrl = null;
            this.selectedFile = null;
          },
          error: (err) => console.error(' Error adding employee:', err),
        });
      };

      reader.readAsDataURL(this.selectedFile);
    } else {
      this.employeeService.addEmployee(formData).subscribe({
        next: () => console.log(' Employee added successfully (no photo)'),
        error: (err) => console.error('Error adding employee:', err),
      });
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    this.formService.profilePhotoControl?.setValue(file);
    this.formService.profilePhotoControl?.updateValueAndValidity();

    if (!this.formService.profilePhotoControl?.errors) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    } else {
      this.previewUrl = null;
      this.selectedFile = null;
      input.value = '';
    }
  }
  switchLanguage(lang: string) {
    this.translate.use(lang);
  }
}
