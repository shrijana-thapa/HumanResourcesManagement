import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserdashboardRoutingModule } from './userdashboard-routing-module';
import { UserDashboardComponent } from '../components/userdashboardcomponent/userdashboardcomponent';
import { GenericTableComponent } from '../../../../shared/components/generic-table/generictablecomponent';
import { FilterComponent } from 'app/shared/components/filter-component/filtercomponent';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [UserDashboardComponent],
  imports: [
    CommonModule,
    RouterModule,
    UserdashboardRoutingModule,
    GenericTableComponent,
    FilterComponent,
    TranslateModule,
  ],
})
export class UserdashboardModule {}
