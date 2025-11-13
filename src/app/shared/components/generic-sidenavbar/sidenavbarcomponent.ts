import { Component, EventEmitter, HostListener, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../material-module/material-module';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
interface menuItem {
  label: string;
  route?: string;
  icon?: string;
}

@Component({
  selector: 'app-sidenavbarcomponent',
  standalone: true,
  templateUrl: './sidenavbarcomponent.html',
  styleUrl: './sidenavbarcomponent.scss',
  imports: [RouterModule, MaterialModule, MatIconModule, CommonModule],
})
export class SidenavbarComponent {
  @Input() menuItems: menuItem[] = [];
  @Input() logout = new EventEmitter<void>();
  @Input() collapsed: boolean = false;
  isMobile = false;
  isSidebarOpen = true;

  constructor(private router: Router) {}
  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }
  private checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
    this.isSidebarOpen = !this.isMobile;
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  onLogout() {
    this.logout.emit();
  }
}
