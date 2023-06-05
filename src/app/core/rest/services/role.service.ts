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
  private readonly ROLES = 'roles';

  constructor(
    private readonly http: HttpClient
  ) {}

  getRoles (): Observable<RoleEntity[]> {
    return this.http.get<any>(`${this.baseUrl}/${this.ROLES}`)
      .pipe(
        map(response => response.data.result),
        catchError(err => throwError(() => new Error (err)))
      )
  }

  checkIfAnyRoleExists (): Observable<boolean> {   
    return this.http.get<any>(`${this.baseUrl}/${this.ROLES}/get-any-role`)
      .pipe(
        map(response => response.result),
        catchError(err => throwError(() => new Error (err)))
      )
  }
}
