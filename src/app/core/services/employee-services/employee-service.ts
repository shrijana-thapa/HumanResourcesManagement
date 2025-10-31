import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'app/environment/environment';
import { EMPLOYEE } from 'app/shared/model/employees-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrlEmployee = `${API_URL}/employees`;
  constructor(private http: HttpClient) {}
  getEmployee(): Observable<EMPLOYEE[]> {
    return this.http.get<EMPLOYEE[]>(this.apiUrlEmployee);
  }
  getEmployeeById(id: number): Observable<EMPLOYEE> {
    return this.http.get<EMPLOYEE>(`${this.apiUrlEmployee}/${id}`);
  }
  addEmployee(employee: EMPLOYEE, file?: File): Observable<EMPLOYEE> {
    return this.http.post<EMPLOYEE>(this.apiUrlEmployee, employee);
  }
  updateEmployee(employee: EMPLOYEE): Observable<EMPLOYEE> {
    return this.http.put<EMPLOYEE>(`${this.apiUrlEmployee}/${employee.id}`, employee);
  }
  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrlEmployee}/${id}`);
  }
}
