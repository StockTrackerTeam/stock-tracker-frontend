
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { noop, Subscription, tap } from 'rxjs';
import { UserEntity } from 'src/app/core/models/user-entity.model';
import { AuthService } from 'src/app/core/rest/services/auth.service';
import { NotificationService } from 'src/app/core/rest/services/notification.service';
import { UserService } from 'src/app/core/rest/services/user.service';
import { alwaysEnabled, InlineActions } from 'src/shared/components/collapsible-action-bar/collapsible-action-bar.model';
import { Roles } from 'src/shared/utils/enums';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
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

  private canDisableUser(user: UserEntity): boolean {
    const admittedRoles = [Roles.ADMIN];
    
    if (!this.authenticationService.checkUserPermissions(admittedRoles)) {
      return false;
    }
    return user.isActive ? true : false;
  }

  private canEnableUser(user: UserEntity): boolean {
    const admittedRoles = [Roles.ADMIN];
    if (!this.authenticationService.checkUserPermissions(admittedRoles)) {
      return false;
    }
    return user.isActive ? false : true;
  }

  private handleViewUser(user: UserEntity): void {
    this.router.navigate(['users', user.id, 'view'])
  }

  private handleDeleteUser(user: UserEntity): void {
    this.loading = true;
    this.userService.deleteUser(user.id)
      .pipe(
        tap((result) => {
          this.loading = false;
          this.onSuccess('UserListComponent.successNotificationTitle', 'UserListComponent.delete.' + result.resultKeys);
        })
      )
      .subscribe({
        next: noop,
        error: (err) => {
          this.loading = false;
          this.onFailure('UserListComponent.errorNotificationTitle', 'UserListComponent.' + err.resultKeys)
        }
      })
  }

  private handleDisableUser(user: UserEntity): void {
    this.loading = true;
    this.userService.changeUserState(user.id)
      .pipe(
        tap((result) => {
          this.loading = false;
          this.onSuccess('UserListComponent.successNotificationTitle', 'UserListComponent.inactivate.' + result.resultKeys)
        })
      )
      .subscribe({
        next: noop,
        error: (err) => {
          this.loading = false;
          this.onFailure('UserListComponent.errorNotificationTitle', 'UserListComponent.' + err.resultKeys)
        }
      })
  }

  private handleEnableUser(user: UserEntity): void {
    this.loading = true;
    this.userService.changeUserState(user.id)
      .pipe(
        tap((result) => {
          this.loading = false;
          this.onSuccess('UserListComponent.successNotificationTitle', 'UserListComponent.activate.' + result.resultKeys)
        })
      )
      .subscribe({
        next: noop,
        error: (err) => {
          this.loading = false;
          this.onFailure('UserListComponent.errorNotificationTitle', 'UserListComponent.' + err.resultKeys)
        }
      })
  }

  constructor (
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly translateService: TranslateService,
    private readonly authenticationService: AuthService,
    private readonly notificationService: NotificationService
  ) {}

  ngOnInit (): void {
    this.loading = true;
    this.sub = this.getUsers()
  }

  onSuccess (title: string, message: string): void {
    const notificationTitle = this.translateService.instant(title);
    const notificationMessage = this.translateService.instant(message);

    this.notificationService.showSuccess(notificationMessage, notificationTitle);

    this.loading = true;
    this.getUsers();
  }

  onFailure (title: string, message: string): void {
    const notificationTitle = this.translateService.instant(title);
    const notificationMessage = this.translateService.instant(message);

    this.notificationService.showError(notificationMessage, notificationTitle);
  }

  getUsers (): Subscription {
    return this.userService.getUsers().pipe(
      tap(data => {
        this.usersList = data;
        this.loading = false;
      })
    ).subscribe({
      next: noop,
      error: err => this.errorMessage = err
    });
  }

  handleNewUser (): void {
    this.router.navigate(['users', 'create']);
  }

  ngOnDestroy (): void { 
    this.sub.unsubscribe;
  }
}
