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


@NgModule({
  declarations: [
    UserListComponent,
    NewUserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    TranslateModule,
    FlexModule,
    ButtonModule,
    TableModule,
    LoadingIndicatorModule
  ]
})
export class UserModule { }
