import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RoleEntity } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private readonly baseUrl = environment.API_URL;

  constructor(
    private readonly http: HttpClient
  ) {}

  getRoles (): Observable<RoleEntity[]> {
    return this.http.get<any>(`${this.baseUrl}/roles`)
      .pipe(
        map(response => response.data.result),
        catchError(err => throwError(() => new Error (err)))
      )
  }
}