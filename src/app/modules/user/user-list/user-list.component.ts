import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { noop, Subscription, tap } from 'rxjs';
import { UserEntity } from 'src/app/core/models/user-entity.model';
import { AuthService } from 'src/app/core/rest/services/auth.service';
import { UserService } from 'src/app/core/rest/services/user.service';
import { alwaysEnabled, InlineActions } from 'src/shared/components/collapsible-action-bar/collapsible-action-bar.model';
import { Roles } from 'src/shared/utils/enums';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  usersList: UserEntity[] = [];
  errorMessage: string = '';
  sub!: Subscription;
  loading = false;

  readonly userActions: InlineActions[] = [
    {
      icon: 'visibility',
      show: this.canViewUser.bind(this),
      description: this.translateService.instant('UserListComponent.view-user'),
      disableCriteria: alwaysEnabled,
      onClick: this.handleViewUser.bind(this),
    },
    {
      icon: 'close',
      show: this.canDeleteUser.bind(this),
      description: this.translateService.instant('UserListComponent.remove-user'),
      disableCriteria: alwaysEnabled,
      onClick: this.handleDeleteUser.bind(this),
    },
    {
      icon: 'lock',
      show: this.canDisableUser.bind(this),
      description: this.translateService.instant('UserListComponent.disable-user'),
      disableCriteria: alwaysEnabled,
      onClick: this.handleDisableUser.bind(this),
    },
    {
      icon: 'lock_open',
      show: this.canEnableUser.bind(this),
      description: this.translateService.instant('UserListComponent.enable-user'),
      disableCriteria: alwaysEnabled,
      onClick: this.handleEnableUser.bind(this),
    }
  ];

  private canViewUser(): boolean {
    const admittedRoles = [Roles.ADMIN];
    return this.authenticationService.checkUserPermissions(admittedRoles);
  }

  private canDeleteUser(): boolean {
    const admittedRoles = [Roles.ADMIN];
    return this.authenticationService.checkUserPermissions(admittedRoles);
  }

  private canDisableUser(): boolean {
    const admittedRoles = [Roles.ADMIN];
    return this.authenticationService.checkUserPermissions(admittedRoles);
  }

  private canEnableUser(): boolean {
    const admittedRoles = [Roles.ADMIN];
    return this.authenticationService.checkUserPermissions(admittedRoles);
  }

  private handleViewUser(): void {
    console.log('view')
  }

  private handleDeleteUser(): void {
    console.log('delete')
  }

  private handleDisableUser(): void {
    console.log('disable')
  }

  private handleEnableUser(): void {
    console.log('enable')
  }

  constructor (
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly translateService: TranslateService,
    private readonly authenticationService: AuthService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.sub = this.userService.getUsers().pipe(
      tap(data => {
        this.usersList = data;
        this.loading = false;
      })
    ).subscribe({
      next: noop,
      error: err => this.errorMessage = err
    });
  }

  handleNewUser() {
    this.router.navigate(['users', 'create']);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
