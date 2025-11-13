import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../shared/material-module/material-module';
import { HeaderComponent } from '../../../shared/components/generic-header/headercomponent';
import { SidenavbarComponent } from '../../../shared/components/generic-sidenavbar/sidenavbarcomponent';
import { Router, RouterModule } from '@angular/router';
interface MenuItem {
  label: string;
  route?: string;
  icon?: string;
  children?: MenuItem[];
}
@Component({
  selector: 'app-wrapper-layoutcomponent',
  standalone: true,
  templateUrl: './layout-component.html',
  styleUrl: './layout-component.scss',
  imports: [MaterialModule, RouterModule, HeaderComponent, SidenavbarComponent],
})
export class LayoutComponent implements OnInit {
  pageTitle: string = 'HRM System';
  currentUserName: string = 'shri';
  showSidebar: boolean = true;
  sidebarItems: MenuItem[] = [];
  constructor(private router: Router) {}
  // this.authservice.getUserName();
  handleLogout() {
    this.router.navigate(['/login']);
  }
  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }
  ngOnInit(): void {
    // this.authService.getUserRole();
    // if(role==="admin"){
    //   this.sidebarItems=[
    //     {label:'Dashboard',route:'',icon:'dashboard'},
    //   ]}
    //   else{
    //     this.sidebarItems=[
    //       {label:'Dashboard'},route:'',icon:'dashboard']
    //   }
    this.sidebarItems = [
      { label: 'Dashboard', route: '/app/dashboard', icon: 'dashboard' },
      { label: 'Employees', route: '/app/employees', icon: 'people' },
      { label: 'Attendance', route: '/app/attendance', icon: 'event' },
      { label: 'Admin Settings', route: '/app/admin-settings', icon: 'settings' },
    ];
  }
}
