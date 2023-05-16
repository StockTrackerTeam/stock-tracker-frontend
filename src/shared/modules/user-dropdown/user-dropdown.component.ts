import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../app/core/rest/services/auth.service';

@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
  styleUrls: ['./user-dropdown.component.scss']
})
export class UserDropdownComponent {
  currentUserFullName = 'Test';

  constructor (
    private readonly authService: AuthService
  ) {}

  logout (): void {
    this.authService.logout();
  }
}
