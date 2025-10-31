import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DashboardService } from '../../services/dashboard-service';
import { BehaviorSubject, Observable, pipe, map } from 'rxjs';
import { combineLatestWith } from 'rxjs';
import { EMPLOYEE } from '../../../../../shared/model/employees-model';
import { TranslateService } from '@ngx-translate/core';

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

  constructor(private employeeService: DashboardService, private translate: TranslateService) {
    translate.addLangs(['en', 'ne']);
    translate.setDefaultLang('en');
    translate.use('ne');
  }

  ngOnInit(): void {
    this.tableData$ = this.employeeService.getEmployees();

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
    console.log('action is clicked', event);
    if (event.action == 'view') {
      alert(`Viewing ${event.data.name}`);
    }
    if (event.action == 'delete') {
    }
    if (event.action == 'update') {
      alert(`Updating ${event.data.name}`);
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
}
