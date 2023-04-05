import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserEntity } from '../../models';
import { UserCreateDTO } from 'src/app/modules/user/dtos/user-create.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseUrl = environment.API_URL;
  constructor (
    private readonly http: HttpClient,
  ) {}

  getUsers (): Observable<UserEntity[]> {
    return this.http.get<any>(`${this.baseUrl}/users/`)
      .pipe(
        map(response => response.data.result),
        catchError(err => throwError(() => new Error(err)))
      )
  }

  createUser (newUser: UserCreateDTO): Observable<UserEntity> {
    return this.http.post<any>(`${this.baseUrl}/users/`, newUser)
      .pipe(
        map(response => response.data.result),
        catchError(err => throwError(() => new Error(err)))
      )
  }
}