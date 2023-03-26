import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserEntity } from 'src/app/core/models/user-entity.model';
import { IResponse } from 'src/shared/utils/interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseUrl = environment.API_URL;
  constructor (
    private readonly http: HttpClient
  ) {}

  getUsers (): Observable<any> {
    return this.http.get<IResponse>(`${this.baseUrl}/users/`)
      .pipe(
        map(response => response.data?.result),
        catchError(err => throwError(() => new Error(err)))
      )
  }
}