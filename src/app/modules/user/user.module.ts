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
import { MatIconModule } from '@angular/material/icon';
import { UserDataComponent } from './user-data/user-data.component';
import { DeleteUserComponent } from './user-delete/user-delete.component';
import { InactivateUserComponent } from './user-inactivate/user-inactivate.component';


@NgModule({
  declarations: [
    UserListComponent,
    NewUserComponent,
    UserDataComponent,
    DeleteUserComponent,
    InactivateUserComponent
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
    MatIconModule
  ]
})
export class UserModule { }
