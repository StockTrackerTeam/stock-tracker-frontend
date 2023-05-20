import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { noop, Subscription, tap } from 'rxjs';
import { UserEntity } from 'src/app/core/models';
import { AuthService } from 'src/app/core/rest/services/auth.service';
import { NotificationService } from 'src/app/core/rest/services/notification.service';
import { UserService } from 'src/app/core/rest/services/user.service';
import { Roles } from 'src/shared/utils/enums';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit, OnDestroy {
  userDataForm!: FormGroup;
  currentUser!: UserEntity;
  userId!: number;
  sub!: Subscription;
  toggleColor: ThemePalette = 'primary';

  constructor (
    private readonly formBuilder: FormBuilder,
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly translateService: TranslateService,
    private readonly authenticationService: AuthService,
    private readonly notificationService: NotificationService
  ) {}

  buildUserDataForm (user: UserEntity): void {
    this.userDataForm = this.formBuilder.group({
      username: new FormControl(user.username, { updateOn: 'change' }),
      firstName: new FormControl(user.firstName, { updateOn: 'change' }),
      lastName: new FormControl(user.lastName, { updateOn: 'change' }),
      role: new FormControl(user.role.label, { updateOn: 'change' }),
      email: new FormControl(
        user.email !== null
        ? user.email
        : this.translateService.instant('UserViewComponent.noEmail'),
        { updateOn: 'change' }),
      isActive: new FormControl(
        user.isActive
        ? this.translateService.instant('UserViewComponent.isActive')
        : this.translateService.instant('UserViewComponent.isInactive'),
        { updateOn: 'change' })
    })
  }

  ngOnInit (): void {
    this.userId = Number(this.route.snapshot.paramMap.get("id") as string);
    this.sub = this.getUser(this.userId); 
  }
  
  getUser (userId: number): Subscription {
    return this.userService.getUser(userId)
    .pipe(
      tap(result => {
        this.currentUser = result;
        this.buildUserDataForm(this.currentUser);
        })
      )
      .subscribe({
        next: noop,
        error: err => console.log(err)
      })
  }

  disableToggleSlide(): boolean {
    const admittedRoles = [Roles.ADMIN];
    return !this.authenticationService.checkUserPermissions(admittedRoles)
  }

  handleUserStatus(): void {
    this.userService.changeUserState(this.currentUser.id)
      .pipe(
        tap((result) => {
          if (this.currentUser.isActive) {
            return this.onSuccess('GeneralMessages.successNotificationTitle', 'UserListComponent.inactivate.' + result.resultKeys);
          }
          return this.onSuccess('GeneralMessages.successNotificationTitle', 'UserListComponent.activate.' + result.resultKeys);
        })
      )
      .subscribe({
        next: noop,
        error: (err) => {
          this.onFailure('GeneralMessages.errorNotificationTitle', 'UserListComponent.' + err.resultKeys);
        }
      })
  }

  onSuccess (title: string, message: string): void {
    const notificationTitle = this.translateService.instant(title);
    const notificationMessage = this.translateService.instant(message);

    this.notificationService.showSuccess(notificationMessage, notificationTitle);

    this.getUser(this.userId);
  }

  onFailure (title: string, message: string): void {
    const notificationTitle = this.translateService.instant(title);
    const notificationMessage = this.translateService.instant(message);

    this.notificationService.showError(notificationMessage, notificationTitle);
  }

  onCancel (): void {
    this.router.navigate(['/users']);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe;
  }
}
