import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { FlexModule } from '@angular/flex-layout';
import { ButtonModule } from 'src/shared/directives';
import { TableModule } from 'src/shared/modules/table/table.module';
import { LoadingIndicatorModule } from 'src/shared/modules/loading-indicator/loading-indicator.module';
import { NewUserComponent } from './new-user/new-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormErrorsModule } from 'src/shared/components/form-errors/form-errors.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { FormSelectModule } from 'src/shared/controls/form-select/form-select.module';
import { CollapsibleActionBarModule } from 'src/shared/components/collapsible-action-bar/collapsible-action-bar.module';
import { UserSettingsComponent } from './user-settings/user-settings.component';


@NgModule({
  declarations: [
    UserListComponent,
    NewUserComponent,
    UserSettingsComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    TranslateModule,
    FlexModule,
    ButtonModule,
    TableModule,
    LoadingIndicatorModule,
    ReactiveFormsModule,
    FormErrorsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    FormSelectModule,
    CollapsibleActionBarModule
  ]
})
export class UserModule { }
