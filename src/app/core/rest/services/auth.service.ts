import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, pipe, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { Roles } from 'src/shared/utils/enums';
import { UserEntity } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl = environment.API_URL;
  token!: string;
  currentUser!: UserEntity;

  constructor (
    private readonly http: HttpClient
  ) {}

  login (username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, { username, password })
      .pipe(
        map((response: any) => {
          this.token = response.data.token;
          this.currentUser = response.data.result;
          localStorage.setItem('user', JSON.stringify(response.data.result));
          localStorage.setItem('token', response.data.token);    
          return this.currentUser;       
        }),
        catchError(err => throwError(() => new Error(err)))
      )
  }

  checkUserPermissions (roles: Roles[], roleId: number): boolean {
    return roles.includes(roleId);
  }
}
