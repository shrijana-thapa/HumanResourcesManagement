import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-headercomponent',
  standalone: true,
  templateUrl: './headercomponent.html',
  styleUrl: './headercomponent.scss',
})
export class HeaderComponent {
  @Input() title: string = '';
  @Input() userName: string = '';
  @Output() logout = new EventEmitter<void>();
  @Output() toggleSidebar = new EventEmitter<void>();

  onLogout() {
    this.logout.emit();
  }
  onToggleSidebar() {
    this.toggleSidebar.emit();
  }
}
