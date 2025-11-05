import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'app/core/services/employee-services/employee-service';
import { EMPLOYEE } from 'app/shared/model/employees-model';

@Component({
  selector: 'app-employeedetails-component',
  standalone: false,
  templateUrl: './employeedetails-component.html',
  styleUrl: './employeedetails-component.scss',
})
export class EmployeeDetailsComponent implements OnInit {
  employee!: EMPLOYEE | null;
  constructor(private employeeService: EmployeeService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadEmployeeDetails(+id);
    }
  }
  loadEmployeeDetails(id: number) {
    this.employeeService.getEmployeeById(id).subscribe({
      next: (data) => {
        this.employee = data;
      },
      error: (err) => {
        console.error('Error fetching employee details:', err);
        this.employee = null;
      },
    });
  }
}
