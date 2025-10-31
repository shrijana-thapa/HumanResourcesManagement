import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../../../../environment/environment';
import { Observable } from 'rxjs';
import { EMPLOYEE } from '../../../../shared/model/employees-model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}
  getEmployees(): Observable<EMPLOYEE[]> {
    return this.http.get<EMPLOYEE[]>(`${API_URL}/employees`);
  }
}
