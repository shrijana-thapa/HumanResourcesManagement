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
  @Output() toggleSidebar = new EventEmitter<void>();

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }
}
