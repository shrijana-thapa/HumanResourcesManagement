import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EmployeeFormService } from '../services/employee-form.service';
import { EMPLOYEE } from 'app/shared/model/employees-model';
import { EmployeeService } from 'app/core/services/employee-services/employee-service';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { canComponentDeactivate } from 'app/core/guards/forms/employee-form-deactivate-guard';
import { GenericDialogComponent } from 'app/shared/components/generic-dialogbox/genericdialogbox';
import { map, Observable } from 'rxjs';
import { GenericSnackbarServices } from 'app/shared/components/generic-snackbar/services/genericsnackbarservices';

@Component({
  selector: 'app-employeeform',
  standalone: false,
  templateUrl: './employeeform.html',
  styleUrls: ['./employeeform.scss'],
})
export class EmployeeFormComponent implements OnInit, canComponentDeactivate {
  previewUrl: string | null = '';
  selectedFile: File | null = null;
  employee: EMPLOYEE | null = null;
  isEditMode = false;
  private formInitialized = false;

  constructor(
    public formService: EmployeeFormService,
    private employeeService: EmployeeService,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private snackbarService: GenericSnackbarServices
  ) {}

  ngOnInit(): void {
    if (!this.formInitialized) {
      this.formService.initForm();
      this.formInitialized = true;
    }

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

    const save$ =
      this.isEditMode && this.employee
        ? this.employeeService.updateEmployee({ ...formData, id: this.employee.id })
        : this.employeeService.addEmployee(formData);

    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        formData.profilePhoto = reader.result as string;

        save$.subscribe({
          next: () => {
            this.snackbarService.success('Employee saved successfully with photo!');
            this.resetForm();
          },
          error: (err) => this.snackbarService.error('Error saving employee,'),
        });
      };
      reader.readAsDataURL(this.selectedFile);
    } else {
      save$.subscribe({
        next: () => {
          this.snackbarService.success('Employee saved successfully (no photo)');
          this.resetForm();
        },
        error: (err) => this.snackbarService.error('Error saving employee:'),
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
  canDeactivate(): boolean | Observable<boolean> {
    if (!this.formService.form?.dirty) {
      return true;
    }
    const dialogRef = this.dialog.open(GenericDialogComponent, {
      data: {
        title: 'Unsaved Changes',
        message: 'You have unsaved changes! Do you really want to leave this page without saving?',
        showCancelButton: true,
        showConfirmButton: true,
        cancelButtonText: 'Stay',
        confirmButtonText: 'Leave',
      },
    });

    return dialogRef.afterClosed().pipe(
      map((result) => {
        return !!result;
      })
    );
  }
}
