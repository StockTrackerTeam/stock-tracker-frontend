import { HttpClient } from "@angular/common/http";
import { map, Observable, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { BaseEntity } from "../models";
import { Resource } from "./rest.resources";

export class RestService<T extends BaseEntity> {
  private readonly baseUrl = environment.API_URL;
  private readonly url: string;

  constructor (
    private readonly http: HttpClient,
    private readonly resource: Resource
  ) {
    this.url = `${this.baseUrl}/${this.resource}`
  }

  protected buildURL(): string {
    return `${this.baseUrl}/${this.resource}`;
  }

  all(): Observable<Array<T>> {
    return this.http.get<Array<T>>(this.buildURL())
      .pipe(
        map(response => this.mapArray(response))
      );
  }

  mapArray(value: any): Array<T> {
    return value.data.result;
  }
}