import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserEntity } from '../../models';
import { UserCreateDTO } from 'src/app/modules/user/dtos/user-create.dto';

interface IUserResponse {
  data: {
    result: UserEntity | UserEntity[],
    count?: number
  },
  resultKeys: string[]
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseUrl = environment.API_URL;

  constructor (
    private readonly http: HttpClient
  ) {}

  getUsers (): Observable<UserEntity[]> {
    return this.http.get<any>(`${this.baseUrl}/users/`)
      .pipe(
        map(response => response.data.result),
        catchError(err => throwError(() => new Error(err)))
      )
  }

  createUser (newUser: UserCreateDTO): Observable<IUserResponse> {
    return this.http.post<any>(`${this.baseUrl}/users/`, newUser)
      .pipe(
        map(response => response)
      )
  }

  deleteUser (id: number): Observable<IUserResponse> {
    return this.http.delete<any>(`${this.baseUrl}/users/${id}`)
      .pipe(
        map(response => response)
      )
  }

  changeUserState (id: number): Observable<IUserResponse> {
    return this.http.patch<any>(`${this.baseUrl}/users/${id}/state`, {})
      .pipe(
        map(response => response)
      )
  }
}