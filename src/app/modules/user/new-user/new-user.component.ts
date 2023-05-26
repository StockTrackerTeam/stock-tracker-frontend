import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, noop, tap } from 'rxjs';
import { RoleEntity } from 'src/app/core/models';
import { NotificationService } from 'src/shared/services/notification.service';
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
  roles$!: Observable<RoleEntity[]>;
  customUsernameErrorMsgs = [
    {
      key: 'minlength',
      customKey: 'username-min-length'
    },
    {
      key: 'maxlength',
      customKey: 'username-max-length'
    }
  ];
  customPasswordErrorMsgs = [
    {
      key: 'minlength',
      customKey: 'password-min-length'
    },
    {
      key: 'maxlength',
      customKey: 'password-max-length'
    }
  ];
  customConfirmPasswordErrorMsgs = [
    {
      key: 'minlength',
      customKey: 'password-min-length'
    },
    {
      key: 'maxlength',
      customKey: 'password-max-length'
    },
    {
      key: 'password-not-match',
      customKey: 'password-not-match'
    }
  ];
  customFirstNameErrorMsgs = [
    {
      key: 'minlength',
      customKey: 'firstName-min-length'
    },
    {
      key: 'maxlength',
      customKey: 'firstName-max-length'
    }
  ];
  customLastNameErrorMsgs = [
    {
      key: 'minlength',
      customKey: 'lastName-min-length'
    },
    {
      key: 'maxlength',
      customKey: 'lastName-max-length'
    }
  ];
  customConfirmEmailErrorMsgs = [
    {
      key: 'email-not-match',
      customKey: 'email-not-match'
    }
  ];

  get role(): FormControl {
    return this.registerForm.get('role') as FormControl;
  }

  constructor (
    private readonly formBuilder: FormBuilder,
    private readonly userService: UserService,
    private readonly roleService: RoleService,
    private readonly notificationService: NotificationService,
    private readonly router: Router,
    private readonly translate: TranslateService
  ) {}

  buildRegisterForm (): void {
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
      role: new FormControl('', {
          validators: [
            Validators.required
          ],
          updateOn: 'change'
      })
    });

    this.registerForm.get('confirmPassword')?.valueChanges
      .pipe(
        tap(value => {
          const passwordValue = this.registerForm.get('password')?.value;
          if (passwordValue !== value) 
            this.registerForm.get('confirmPassword')?.setErrors({'password-not-match': true});          
        })
      )
      .subscribe({
        next: noop,
        error: err => console.log(err)
      });

      this.registerForm.get('password')?.valueChanges
      .pipe(
        tap(value => {
          const confirmPasswordValue = this.registerForm.get('confirmPassword')?.value;
          if (confirmPasswordValue !== value) {
            this.registerForm.get('confirmPassword')?.setErrors({'password-not-match': true});
          } else {
            this.registerForm.get('confirmPassword')?.setErrors({'password-not-match': null});
            this.registerForm.get('confirmPassword')?.updateValueAndValidity();
          }
        })
      )
      .subscribe({
        next: noop,
        error: err => console.log(err)
      });

      this.registerForm.get('confirmEmail')?.valueChanges
      .pipe(
        tap(value => {
          const emailValue = this.registerForm.get('email')?.value;
          if (emailValue !== value) 
            this.registerForm.get('confirmEmail')?.setErrors({'email-not-match': true});          
        })
      )
      .subscribe({
        next: noop,
        error: err => console.log(err)
      });

      this.registerForm.get('email')?.valueChanges
      .pipe(
        tap(value => {
          const confirmEmailValue = this.registerForm.get('confirmEmail')?.value;
          if (confirmEmailValue !== value) {
            this.registerForm.get('confirmEmail')?.setErrors({'email-not-match': true});
          } else {
            this.registerForm.get('confirmEmail')?.setErrors({'email-not-match': null});
            this.registerForm.get('confirmEmail')?.updateValueAndValidity();
          }
        })
      )
      .subscribe({
        next: noop,
        error: err => console.log(err)
      });
  }

  ngOnInit (): void {
    this.buildRegisterForm();

    this.roles$ = this.roleService.getRoles();
  }

  getControlValue (controlName: string): string {
    return this.registerForm.controls[controlName].value;
  }

  onCancel (): void {
    this.router.navigate(['/users']);
  }

  onSubmit (): void {
    if (this.registerForm?.invalid) {
      const notificationTitle = this.translate.instant('GeneralMessages.errorNotificationTitle');
      const notificationMessage = this.translate.instant('GeneralMessages.errorNotificationMessage');

      this.notificationService.showError(notificationMessage, notificationTitle);
      return;
    }

    this.loading = true;

    const email = this.getControlValue('email');
    const confirmEmail = this.getControlValue('confirmEmail');
    const data = {
      ...this.registerForm.value,
      roleId: Number(this.getControlValue('role')),
      email: email === '' ? undefined : email,
      confirmEmail: confirmEmail === '' ? undefined : confirmEmail
    }
    
    this.userService.createUser(data)
      .pipe(
        tap((result) => {
          this.loading = false;
          const notificationTitle = this.translate.instant('GeneralMessages.successNotificationTitle');
          const notificationMessage = this.translate.instant('NewUserComponent.' + result.resultKeys);

          this.notificationService.showSuccess(notificationMessage, notificationTitle);
          this.router.navigate(['/users']);
        })
      )
      .subscribe({
        next: noop,
        error: (err) => {       
          this.loading = false;
          this.notificationService.showErrorNotification('NewUserComponent', err.error.resultKeys);
        }
      })
  }
}
