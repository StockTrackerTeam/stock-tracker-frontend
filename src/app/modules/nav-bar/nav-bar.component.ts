import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/rest/services/auth.service';
import { Roles } from 'src/shared/utils/enums';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  constructor (
    private readonly authService: AuthService
   ) {}

  get canAccessUserModule (): boolean {
    const admittedRoles = [
      Roles.ADMIN
    ];
    return this.authService.checkUserPermissions(admittedRoles);
  }

  get canAccessAssetLevelModule (): boolean {
    const admittedRoles = [
      Roles.ADMIN
    ];
    return this.authService.checkUserPermissions(admittedRoles);
  }
}
