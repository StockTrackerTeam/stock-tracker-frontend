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
}