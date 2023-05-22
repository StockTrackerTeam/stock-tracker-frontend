import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { AssetLevelEntity } from '../../models/asset-level-entity.model';

interface IAssetLevelResponse {
  data: {
    result: AssetLevelEntity | AssetLevelEntity[],
    count?: number
  },
  resultKeys: string[]
}

@Injectable({
  providedIn: 'root'
})
export class AssetLevelService {
  private readonly baseUrl = environment.API_URL;
  private readonly ASSET_LEVELS = 'asset-levels';

  constructor(
    private readonly http: HttpClient
  ) {}

  getAssetLevels (): Observable<AssetLevelEntity[]> {
    return this.http.get<any>(`${this.baseUrl}/${this.ASSET_LEVELS}`)
      .pipe(
        map(response => response.data.result),
        catchError(err => throwError(() => new Error(err)))
      )
  }

  deleteAssetLevel (id: number): Observable<IAssetLevelResponse> {
    return this.http.delete<any>(`${this.baseUrl}/${this.ASSET_LEVELS}/${id}`)
      .pipe(
        map(response => response)
      ) 
  }
}