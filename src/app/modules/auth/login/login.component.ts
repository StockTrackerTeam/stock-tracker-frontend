import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { noop, tap } from 'rxjs';
import { UserEntity } from 'src/app/core/models';
import { AuthService } from 'src/app/core/rest/services/auth.service';
import { Roles } from 'src/shared/utils/enums';
import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  error = '';
  loading = false;
  color: ThemePalette = 'warn';

  constructor (
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'change'
      }),
      password: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'change'
      }),
      keepSessionOpen: new FormControl(false, {
        updateOn: 'change'
      })
    });
  }

  onSubmit(): void {
    if (this.loginForm?.invalid) {
      return;
    }

    this.loading = true;
    
    this.authService.login(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value, this.loginForm.controls['keepSessionOpen'].value)
      .pipe(
        tap((user: UserEntity) => {
          this.loading = false; 
          if (user.roleId === Roles.ADMIN) this.router.navigate(['/users']);
          else this.router.navigate(['']);  // TODO - we should remove this conditional and let the authguard do the role-based redirecting
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
