import { Component } from '@angular/core';

@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
  styleUrls: ['./user-dropdown.component.scss']
})
export class UserDropdownComponent {
  currentUserFullName = 'Test';

  constructor () {}

  logout () {
    console.log('Cerrar sesion');
    
  }
}
