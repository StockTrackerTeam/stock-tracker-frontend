import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { MenuComponent } from '../menu.component';

@Component({
  selector: 'app-menu-ellipsis',
  templateUrl: './menu-ellipsis.component.html',
  styleUrls: ['./menu-ellipsis.component.scss']
})
export class MenuEllipsisComponent {

  @Input()
  menu!: MenuComponent;

  constructor(private el: ElementRef) { }

  toggleMenu(): void {
    this.menu.triggerRef = this.el;
    this.menu.toggle();
  }
}
