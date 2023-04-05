import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { noop, tap } from 'rxjs';
import { RoleEntity } from 'src/app/core/models';
import { RoleService } from 'src/app/core/rest/services/role.service';
import { UserService } from 'src/app/core/rest/services/user.service';
import { UserCreateDTO } from '../dtos/user-create.dto';

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
    private readonly roleService: RoleService
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
            Validators.maxLength(50),
            Validators.required
          ],
          updateOn: 'change'
      }),
      lastName: new FormControl('', {
          validators: [
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
        tap(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: noop,
        error: (err) => {
          this.loading = false;
          console.log('Error: ', err);
        }
      })
  }
}
