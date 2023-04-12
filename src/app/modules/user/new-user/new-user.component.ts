import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { noop, tap } from 'rxjs';
import { RoleEntity } from 'src/app/core/models';
import { NotificationService } from 'src/app/core/rest/services/notification.service';
import { RoleService } from 'src/app/core/rest/services/role.service';
import { UserService } from 'src/app/core/rest/services/user.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {
  registerForm!: FormGroup;
  errorMessage = '';
  loading = false;
  roleList!: RoleEntity[];

  constructor (
    private readonly formBuilder: FormBuilder,
    private readonly userService: UserService,
    private readonly roleService: RoleService,
    private readonly notificationService: NotificationService,
    private readonly router: Router,
    private readonly translate: TranslateService
  ) {}

  buildRegisterForm() {
    this.registerForm = this.formBuilder.group({
      username: new FormControl('', {
        validators: [
          Validators.minLength(6),
          Validators.maxLength(20),
          Validators.required
        ],
        updateOn: 'change'
      }),
      password: new FormControl('', {
          validators: [
            Validators.minLength(8),
            Validators.maxLength(20),
            Validators.required
          ],
          updateOn: 'change'
      }),
      confirmPassword: new FormControl('', {
          validators: [
            Validators.minLength(8),
            Validators.maxLength(20),
            Validators.required
          ],
          updateOn: 'change'
      }),
      firstName: new FormControl('', {
          validators: [
            Validators.minLength(2),
            Validators.maxLength(50),
            Validators.required
          ],
          updateOn: 'change'
      }),
      lastName: new FormControl('', {
          validators: [
            Validators.minLength(2),
            Validators.maxLength(50),
            Validators.required
          ],
          updateOn: 'change'
      }),
      email: new FormControl('', {
          validators: [
            Validators.email
          ],
          updateOn: 'change'
      }),
      confirmEmail: new FormControl('', {
          validators: [
            Validators.email
          ],
          updateOn: 'change'
      }),
      roleId: new FormControl('', {
          validators: [
            Validators.required
          ],
          updateOn: 'change'
      })
    })
  }

  ngOnInit(): void {
    this.buildRegisterForm()

    this.roleService.getRoles()
      .pipe(
        tap(data => 
          this.roleList = data
        )
      )
      .subscribe({
        next: noop,
        error: err => this.errorMessage = err
      })
  }

  getControlValue (controlName: string): string {
    return this.registerForm.controls[controlName].value;
  }

  onSubmit(): void {
    if (this.registerForm?.invalid) {
      const notificationTitle = this.translate.instant('NewUserComponent.errorNotificationTitle');
      const notificationMessage = this.translate.instant('NewUserComponent.errorNotificationMessage');

      this.notificationService.showError(notificationMessage, notificationTitle);
      return;
    }

    this.loading = true;

    const email = this.getControlValue('email');
    const confirmEmail = this.getControlValue('confirmEmail');
    const data = {
      ...this.registerForm.value,
      roleId: Number(this.getControlValue('roleId')),
      email: email === '' ? undefined : email,
      confirmEmail: confirmEmail === '' ? undefined : confirmEmail
    }
    
    this.userService.createUser(data)
      .pipe(
        tap((result) => {
          this.loading = false;
          const notificationTitle = this.translate.instant('NewUserComponent.successNotificationTitle');
          const notificationMessage = this.translate.instant('NewUserComponent.' + result.resultKeys);

          this.notificationService.showSuccess(notificationMessage, notificationTitle);
          this.router.navigate(['/users']);
        })
      )
      .subscribe({
        next: noop,
        error: (err) => {       
          this.loading = false;
          
          const notificationTitle = this.translate.instant('NewUserComponent.errorNotificationTitle');
          let notificationMessage = '';
          for(const key of err.error.resultKeys) {
            notificationMessage += `<span>${this.translate.instant('NewUserComponent.' + key)}</span> <br />`;
          }
          
          this.notificationService.showError(notificationMessage, notificationTitle);
        }
      })
  }
}
