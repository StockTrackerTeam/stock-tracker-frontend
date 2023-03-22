import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { MatMenuModule } from '@angular/material/menu';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ButtonModule } from './directives/button';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    MatMenuModule,
    FlexLayoutModule,
    TranslateModule.forChild(),
    ButtonModule
  ],
  exports: [
    FlexLayoutModule,
    MaterialModule,
  ]
})
export class SharedModule { }
