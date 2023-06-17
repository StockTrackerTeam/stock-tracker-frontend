import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmCancelModalComponent } from './confirm-cancel-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FlexModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from '../../directives';



@NgModule({
  declarations: [
    ConfirmCancelModalComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    FlexModule,
    TranslateModule,
    ButtonModule
  ],
  exports: [
    ConfirmCancelModalComponent
  ]
})
export class ConfirmCancelModalModule { }
