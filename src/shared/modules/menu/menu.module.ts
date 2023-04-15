import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuEllipsisComponent } from './menu-ellipsis/menu-ellipsis.component';
import { MenuComponent } from './menu.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatIconModule } from '@angular/material/icon';
import { ButtonModule } from '../../directives/button';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  declarations: [
    MenuEllipsisComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    OverlayModule,
    MatIconModule,
    MatRippleModule,
    ButtonModule
  ],
  exports: [
    MenuComponent,
    MenuEllipsisComponent
  ]
})
export class MenuModule { }
