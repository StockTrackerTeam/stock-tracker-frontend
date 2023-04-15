import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollapsibleActionBarComponent } from './collapsible-action-bar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MenuModule } from '../../modules/menu/menu.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    CollapsibleActionBarComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MenuModule,
    MatTooltipModule,
    MatRippleModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    CollapsibleActionBarComponent
  ]
})
export class CollapsibleActionBarModule { }
