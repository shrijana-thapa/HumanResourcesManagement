import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable, pipe, map } from 'rxjs';
import { combineLatestWith } from 'rxjs';
import { EMPLOYEE } from '../../../../../shared/model/employees-model';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'app/core/services/employee-services/employee-service';
import { MatDialog } from '@angular/material/dialog';
import { GenericDialogComponent } from 'app/shared/components/generic-dialogbox/genericdialogbox';
import { GenericSnackbarServices } from 'app/shared/components/generic-snackbar/services/genericsnackbarservices';

@Component({
  selector: 'app-userdashboardcomponent',
  standalone: false,
  templateUrl: './userdashboardcomponent.html',
  styleUrls: ['./userdashboardcomponent.scss'],
})
export class UserDashboardComponent implements OnInit {
  tableData$!: Observable<EMPLOYEE[]>;
  filteredTableData$!: Observable<EMPLOYEE[]>;
  private filterValue$ = new BehaviorSubject<{
    department?: string | null;
    role?: string | null;
    status?: string | null;
  }>({});

  constructor(
    private employeeService: EmployeeService,
    private translate: TranslateService,
    private router: Router,
    private dialog: MatDialog,
    private snackbarService: GenericSnackbarServices
  ) {
    translate.addLangs(['en', 'ne']);
    translate.setDefaultLang('en');
    translate.use('ne');
  }

  ngOnInit(): void {
    this.loadEmployees();
  }

  private loadEmployees() {
    this.tableData$ = this.employeeService.getEmployee();

    //filter logic
    this.filteredTableData$ = this.tableData$.pipe(
      combineLatestWith(this.filterValue$),
      map(([employees, filters]) => {
        const { department, role, status } = filters;
        return employees.filter((emp: EMPLOYEE) => {
          return (
            (!department || emp.department?.toLowerCase() === department.toLowerCase()) &&
            (!role || emp.role?.toLowerCase() === role.toLowerCase()) &&
            (!status || emp.status?.toLowerCase() === status.toLowerCase())
          );
        });
      })
    );
  }

  tableHeading = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    { key: 'department', label: 'Department' },
    { key: 'status', label: 'Status' },
    { key: 'salary', label: 'Salary' },
    { key: 'joiningDate', label: 'JoiningDate' },
    { key: 'profilePhoto', label: 'ProfilePhoto' },
  ];

  showActions = true;
  actions = [
    { type: 'view', label: 'View' },
    { type: 'update', label: 'Update' },
    { type: 'delete', label: 'Delete' },
  ];

  onActionTable(event: { action: string; data: any }) {
    const employeeId = event.data.id;
    const employeeName = event.data.name;

    switch (event.action) {
      case 'view':
        alert(`Viewing ${event.data.name}`);
        this.router.navigate([`/addForm/view/${employeeId}`]);
        break;
      case 'delete':
        this.deleteEmployee(employeeId, employeeName);
        break;
      case 'update':
        if (employeeId) {
          this.router.navigate([`/addForm/edit/${employeeId}`]);
        } else {
          console.error('Employee ID not found!');
        }
    }
  }
  //filter
  onFilterChanged(filteredValue: {
    department?: string | null;
    role?: string | null;
    status?: string | null;
  }) {
    console.log('filter value arrived');
    this.filterValue$.next(filteredValue);
  }
  deleteEmployee(employeeId: number, employeeName: string) {
    const dialogRef = this.dialog.open(GenericDialogComponent, {
      data: {
        title: 'Delete Employee',
        message: 'Are you sure you want to delete ${employeeName}?',
        showCancelButton: true,
        showConfirmButton: true,
        cancelButtonText: 'Cancel',
        confirmButtonText: 'Delete',
      },
    });
    dialogRef.afterClosed().pipe(
      map((confirmed) => {
        if (confirmed) {
          this.employeeService.deleteEmployeeById(employeeId).subscribe({
            next: () => {
              this.snackbarService.success(`Successfuly Deleted ${employeeName}`);
              this.loadEmployees();
            },
            error: () => {
              this.snackbarService.error('Failed to delete employee. Please try again.');
            },
          });
        }
      })
    );
  }
}
