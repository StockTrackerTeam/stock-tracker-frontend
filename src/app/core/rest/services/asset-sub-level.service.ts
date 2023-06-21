import { Injectable } from '@angular/core';
import { AssetSubLevelEntity } from '../../models/asset-sub-level-entity.model';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

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

  getAssetSubLevels (): Observable<AssetSubLevelEntity[]> {
    return this.http.get<any>(`${this.baseUrl}/${this.ASSET_SUB_LEVELS}`)
      .pipe(
        map(response => response.data.result),
        catchError(err => throwError(() => new Error(err)))
      )
  }
}
