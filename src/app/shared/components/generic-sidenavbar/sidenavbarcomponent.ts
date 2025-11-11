import { Component, Input } from '@angular/core';
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
  @Input() collapsed: boolean = false;

  constructor(private router: Router) {}

  isActive(route: string | undefined): boolean {
    return this.router.url === route;
  }
}
