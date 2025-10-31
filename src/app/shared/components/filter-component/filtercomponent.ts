import { Component, EventEmitter, Output } from '@angular/core';
import { GenericInputSelect } from '../generic-select/genericinputselect';
import { FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-filter-component',
  standalone: true,
  imports: [GenericInputSelect, MatFormFieldModule, CommonModule, MatIconModule],
  templateUrl: './filtercomponent.html',
  styleUrl: './filtercomponent.scss',
})
export class FilterComponent {
  isModalOpen = false;
  @Output() filterChanged = new EventEmitter<{
    department?: string | null;
    role?: string | null;
    status?: string | null;
  }>();
  departmentControl = new FormControl();
  roleControl = new FormControl();
  statusControl = new FormControl();

  departmentOptions = [
    { value: 'HR', label: 'Human Resources' },
    { value: 'Engineering', label: 'Engineering' },
    { value: 'Sales', label: 'Sales' },
    { value: 'Finance', label: 'Finance' },
  ];

  roleOptions = [
    { value: 'Manager', label: 'Manager' },
    { value: 'Developer', label: 'Developer' },
    { value: 'Designer', label: 'Designer' },
    { value: 'Intern', label: 'Intern' },
  ];

  statusOptions = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
  ];
  openModal() {
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden';
  }
  closeModal() {
    this.isModalOpen = false;
    document.body.style.overflow = 'auto';
  }
  resetFilters() {
    this.departmentControl.reset();
    this.roleControl.reset();
    this.statusControl.reset();
    this.applyFilters();
  }

  applyFilters() {
    const filters = {
      department: this.departmentControl.value,
      role: this.roleControl.value,
      status: this.statusControl.value,
    };
    this.filterChanged.emit(filters);
    this.closeModal();
    console.log('click apply');
  }
}
