import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeformRoutingModule } from './employeeform-routing-module';
import { EmployeeFormComponent } from '../components/employeeform';
import { MaterialModule } from 'app/shared/material-module/material-module';
import { ReactiveFormsModule } from '@angular/forms';
import { GenericInputTextComponent } from 'app/shared/components/input-text/generic-input-text';
import { GenericDatePicker } from 'app/shared/components/generic-datepicker/genericdatepicker';
import { GenericInputNumber } from 'app/shared/components/generic-number/genericnumbercomponent';
import { SharedmoduleModule } from 'app/shared/shared-module/sharedmodule-module';
import { GenericInputSelect } from 'app/shared/components/generic-select/genericinputselect';
import { AutoFocusFirstInputDirective } from 'app/shared/directives/auto-focus-firstinput/auto-focus';
import { AutoFocusFirstInvalidInputDirective } from 'app/shared/directives/auto-focus-firstinvalid/autofocusfirstinvalidinput';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [EmployeeFormComponent],
  imports: [
    CommonModule,
    EmployeeformRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    GenericInputTextComponent,
    GenericDatePicker,
    GenericInputNumber,
    SharedmoduleModule,
    GenericInputSelect,
    AutoFocusFirstInputDirective,
    AutoFocusFirstInvalidInputDirective,
    TranslateModule,
  ],
})
export class EmployeeformModule {}
