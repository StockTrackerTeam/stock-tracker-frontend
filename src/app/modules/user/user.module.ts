import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { FlexModule } from '@angular/flex-layout';
import { ButtonModule } from 'src/shared/directives';
import { TableModule } from 'src/shared/modules/table/table.module';


@NgModule({
  declarations: [
    UserListComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    TranslateModule,
    FlexModule,
    ButtonModule,
    TableModule
  ]
})
export class UserModule { }
