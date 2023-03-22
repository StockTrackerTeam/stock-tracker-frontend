import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, pipe, throwError } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl = environment.API_URL;
  constructor (
    private readonly http: HttpClient
  ) {}

  login (username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, { username, password })
      .pipe(
        map((response: any) => response.data),
        catchError(err => throwError(() => new Error(err)))
      )
  }
}
