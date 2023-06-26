import { Component, OnInit } from '@angular/core';
import { tap, noop, Subscription } from 'rxjs';
import { AssetSubLevelService } from '../../../core/rest/services/asset-sub-level.service';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../../../../shared/services/notification.service';
import { AssetSubLevelEntity } from '../../../core/models/asset-sub-level-entity.model';
import { InlineActions, alwaysEnabled } from '../../../../shared/components/collapsible-action-bar/collapsible-action-bar.model';

@Component({
  selector: 'app-asset-sub-level-list',
  templateUrl: './asset-sub-level-list.component.html',
  styleUrls: ['./asset-sub-level-list.component.scss']
})
export class AssetSubLevelListComponent implements OnInit {
  assetSubLevels: AssetSubLevelEntity[] = [];
  loading = false;
  errorMessage!: string;

  readonly assetSubLevelActions: InlineActions[] = [
    {
      icon: 'edit',
      show: this.canHandleAssetSubLevel.bind(this),
      description: this.translateService.instant('AssetLevelListComponent.edit-assetLevel'),
      disableCriteria: alwaysEnabled,
      onClick: this.handleEditAssetSubLevel.bind(this)
    },
    {
      icon: 'delete',
      show: this.canHandleAssetSubLevel.bind(this),
      description: this.translateService.instant('AssetLevelListComponent.delete-assetLevel'),
      disableCriteria: alwaysEnabled,
      onClick: this.handleDeleteAssetSubLevel.bind(this)
    }
  ]

  constructor (
    private readonly assetSubLevelService: AssetSubLevelService,
    private readonly translateService: TranslateService,
    private readonly notificationService: NotificationService
  ) {}

  canHandleAssetSubLevel (): boolean {
    return true
  }

  handleEditAssetSubLevel (): void {
    alert('Future edit');
  }

  handleDeleteAssetSubLevel (): void {
    alert('Future delete');
  }

  handleNewAssetSubLevel (): void {
    alert('Future create');
  }

  ngOnInit(): void {
    this.getAssetSubLevels();
  }

  getAssetSubLevels (): Subscription {
    this.loading = true;

    return this.assetSubLevelService.getAssetSubLevels()
      .pipe(
        tap(data => {
          this.assetSubLevels = data;
          this.loading = false;
        })
      )
      .subscribe({
        next: noop,
        error: err => this.errorMessage = err
      });
  }
}
