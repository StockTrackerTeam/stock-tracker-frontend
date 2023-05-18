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

  login (username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, { username, password })
      .pipe(
        map((response: any) => {
          this.token = response.data.token;
          this.currentUser = response.data.result;
          this.setCurrentUser(response.data.result);
          localStorage.setItem('token', response.data.token);    
          return this.currentUser;       
        }),
        catchError(err => throwError(() => new Error(err)))
      )
  }

  logout (): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  setCurrentUser (user: UserEntity): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getCurrentUser (): UserEntity {
    return JSON.parse(localStorage.getItem('user') as string);
  }

  checkUserPermissions (roles: Roles[]): boolean {
    const user: UserEntity = this.getCurrentUser();
    return roles.includes(user.roleId);
  }
}
