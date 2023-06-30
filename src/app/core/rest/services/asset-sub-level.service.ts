import { Injectable } from '@angular/core';
import { AssetSubLevelEntity } from '../../models/asset-sub-level-entity.model';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { AssetSubLevelDTO } from '../../../modules/asset-sublevel/dto/asset-sub-level-dto';

interface IAssetSubLevelResponse {
  data: {
    result: AssetSubLevelEntity | AssetSubLevelEntity[],
    count?: number
  },
  resultKeys: string[]
}

@Injectable({
  providedIn: 'root'
})
export class AssetSubLevelService {
  private readonly baseUrl = environment.API_URL;
  private readonly ASSET_SUB_LEVELS = 'asset-sublevels';

  constructor(
    private readonly http: HttpClient
  ) { }

  createAssetSubLevel (newAssetSubLevel: AssetSubLevelDTO): Observable<IAssetSubLevelResponse> {
    return this.http.post<any>(`${this.baseUrl}/${this.ASSET_SUB_LEVELS}`, newAssetSubLevel)
      .pipe(
        map(response => response)
      )
  }

  getAssetSubLevels (): Observable<AssetSubLevelEntity[]> {
    return this.http.get<any>(`${this.baseUrl}/${this.ASSET_SUB_LEVELS}`)
      .pipe(
        map(response => response.data.result),
        catchError(err => throwError(() => new Error(err)))
      )
  }

  getAssetSubLevel (id: number): Observable<AssetSubLevelEntity> {
    return this.http.get<any>(`${this.baseUrl}/${this.ASSET_SUB_LEVELS}/${id}`)
      .pipe(
        map(response => response.data.result),
        catchError(err => throwError(() => new Error(err)))
      )
  }

  updateAssetSubLevel (id: number, assetSubLevelDTO: AssetSubLevelDTO): Observable<IAssetSubLevelResponse> {
    return this.http.put<any>(`${this.baseUrl}/${this.ASSET_SUB_LEVELS}/${id}`, assetSubLevelDTO)
      .pipe(
        map(response => response)
      )
  }

  deleteAssetSubLevel (id: number): Observable<IAssetSubLevelResponse> {
    return this.http.delete<any>(`${this.baseUrl}/${this.ASSET_SUB_LEVELS}/${id}`)
      .pipe(
        map(response => response)
      )
  }
}
