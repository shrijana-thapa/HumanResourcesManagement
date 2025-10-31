import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EmployeeFormService } from '../services/employee-form.service';
import { EMPLOYEE } from 'app/shared/model/employees-model';
import { EmployeeService } from 'app/core/services/employee-services/employee-service';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employeeform',
  standalone: false,
  templateUrl: './employeeform.html',
  styleUrls: ['./employeeform.scss'],
})
export class EmployeeFormComponent implements OnInit {
  previewUrl: string | null = '';
  selectedFile: File | null = null;
  employee: EMPLOYEE | null = null;
  isEditMode = false;

  constructor(
    public formService: EmployeeFormService,
    private employeeService: EmployeeService,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formService.initForm();

    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.isEditMode = true;
        this.employeeService.getEmployeeById(id).subscribe({
          next: (employee: EMPLOYEE) => {
            this.employee = employee;
            this.formService.patchEmployeeForm(employee);
            this.cdr.detectChanges();
          },
          error: (err) => console.error(err),
        });
      }
    });

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

    const save = () => {
      if (this.isEditMode && this.employee) {
        formData.id = this.employee.id;
        return this.employeeService.updateEmployee(formData);
      } else {
        return this.employeeService.addEmployee(formData);
      }
    };
    save();

    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        formData.profilePhoto = reader.result as string;

        save().subscribe({
          next: () => {
            console.log('Employee saved successfully with photo!');
            this.resetForm();
          },
          error: (err) => console.error('Error saving employee:', err),
        });
      };
      reader.readAsDataURL(this.selectedFile);
    } else {
      save().subscribe({
        next: () => {
          console.log('Employee saved successfully (no photo)');
          this.resetForm();
        },
        error: (err) => console.error('Error saving employee:', err),
      });
    }
  }

  resetForm() {
    this.formService.reset();
    this.previewUrl = null;
    this.selectedFile = null;
    this.router.navigate(['/employees']);
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
