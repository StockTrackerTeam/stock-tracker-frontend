import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { noop, tap } from 'rxjs';
import { AuthService } from 'src/app/core/rest/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  error = '';
  loading = false;

  constructor (
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', {
        validators: [
          Validators.minLength(6),
          Validators.maxLength(30),
          Validators.required
        ],
        updateOn: 'change'
      }),
      password: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'change'
      })
    });
  }

  onSubmit(): void {
    if (this.loginForm?.invalid) {
      return;
    }

    this.loading = true;
    this.authService.login(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value)
      .pipe(
        tap(() => {
          this.loading = false;
          this.router.navigate(['/users']);    
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
