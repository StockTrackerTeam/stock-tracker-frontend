import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEditModalComponent } from './create-edit-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FlexModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from '../../directives';



@NgModule({
  declarations: [
    CreateEditModalComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    FlexModule,
    TranslateModule,
    ButtonModule
  ],
  exports: [
    CreateEditModalComponent
  ]
})
export class CreateEditModalModule { }
