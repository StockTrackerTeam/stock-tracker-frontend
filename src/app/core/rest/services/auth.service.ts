import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, pipe, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { Roles } from 'src/shared/utils/enums';
import { UserEntity } from '../../models';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl = environment.API_URL;
  token!: string;
  currentUser!: UserEntity;


  constructor (
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  login (username: string, password: string, keepSessionOpen: boolean): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, { username, password })
      .pipe(
        map((response: any) => {
          this.token = response.data.token;
          this.currentUser = response.data.result;

          this.storeUserData(keepSessionOpen, response.data.result, response.data.token);
              
          return this.currentUser;       
        }),
        catchError(err => throwError(() => new Error(err)))
      )
  }

  logout (): void {
    if (this.isLoggedIn()) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    } else {
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('token');
    }
    this.router.navigate(['/login']);
  }

  isLoggedIn (): boolean {
    return !!JSON.parse(localStorage.getItem('user') as string);
  }

  storeUserData (keepSessionOpen: boolean, user: UserEntity, token: string): void {
    if (keepSessionOpen) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
    } else {
      sessionStorage.setItem('user', JSON.stringify(user));
      sessionStorage.setItem('token', token);
    }
  }

  updateCurrentUser (user: UserEntity): void {
    if (this.isLoggedIn()) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      sessionStorage.setItem('user', JSON.stringify(user));
    }
  }

  getCurrentUser (): UserEntity {
    return this.isLoggedIn()
      ? JSON.parse(localStorage.getItem('user') as string)
      : JSON.parse(sessionStorage.getItem('user') as string);
  }

  getCurrentToken (): string {
    return this.isLoggedIn()
      ? localStorage.getItem('token') as string
      : sessionStorage.getItem('token') as string;
  }

  checkUserPermissions (roles: Roles[]): boolean {
    const user: UserEntity = this.getCurrentUser();
    return roles.includes(user.roleId);
  }
}
