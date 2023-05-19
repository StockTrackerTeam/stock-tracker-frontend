import { Component, OnInit } from '@angular/core';
import { AssetLevelService } from '../../../core/rest/services/asset-level.service';
import { tap, noop, Subscription } from 'rxjs';
import { AssetLevelEntity } from '../../../core/models/asset-level-entity.model';
import { Router } from '@angular/router';
import { InlineActions, alwaysEnabled } from '../../../../shared/components/collapsible-action-bar/collapsible-action-bar.model';
import { TranslateService } from '@ngx-translate/core';
import { Roles } from '../../../../shared/utils/enums';
import { AuthService } from '../../../core/rest/services/auth.service';
import { NotificationService } from '../../../core/rest/services/notification.service';

@Component({
  selector: 'app-asset-level-list',
  templateUrl: './asset-level-list.component.html',
  styleUrls: ['./asset-level-list.component.scss']
})
export class AssetLevelListComponent implements OnInit {
  assetLevelsList: AssetLevelEntity[] = []
  errorMessage!: string;
  loading = false;

  readonly assetLevelActions: InlineActions[] = [
    {
      icon: 'edit',
      show: this.canHandleAssetLevel.bind(this),
      description: this.translateService.instant('AssetLevelListComponent.edit-assetLevel'),
      disableCriteria: alwaysEnabled,
      onClick: this.handleViewAssetLevel.bind(this)
    },
    {
      icon: 'delete',
      show: this.canHandleAssetLevel.bind(this),
      description: this.translateService.instant('AssetLevelListComponent.delete-assetLevel'),
      disableCriteria: alwaysEnabled,
      onClick: this.handleDeleteAssetLevel.bind(this)
    }
  ]

  constructor (
    private readonly assetLevelService: AssetLevelService,
    private readonly router: Router,
    private readonly translateService: TranslateService,
    private readonly authService: AuthService,
    private readonly notificationService: NotificationService
  ) {}

  private canHandleAssetLevel (): boolean {
    const admittedRoles = [Roles.ADMIN];
    return this.authService.checkUserPermissions(admittedRoles);
  }

  private handleViewAssetLevel (): void {

  }

  private handleDeleteAssetLevel (AssetLevel: AssetLevelEntity): void {
    this.assetLevelService.deleteAssetLevel(AssetLevel.id)
      .pipe(
        tap((result) => {
          this.loading = false;
          this.onSuccess('successNotificationTitle', 'AssetLevelListComponent.delete.' + result.resultKeys)
        })
      )
      .subscribe({
        next: noop,
        error: (err) => {
          this.loading = false;
          this.onFailure('errorNotificationTitle', 'AssetLevelListComponent.' + err.resultKeys)
        }
      })
  }


  ngOnInit(): void {
    this.getAssetLevels();
  }

  getAssetLevels (): Subscription {
    return this.assetLevelService.getAssetLevels()
      .pipe(
        tap(data => {
          this.assetLevelsList = data;
          this.loading = false;
        })
      )
      .subscribe({
        next: noop,
        error: err => this.errorMessage = err
      });
  }

  onSuccess (title: string, message: string): void {
    const notificationTitle = this.translateService.instant(title);
    const notificationMessage = this.translateService.instant(message);

    this.notificationService.showSuccess(notificationMessage, notificationTitle);

    this.loading = true;
    this.getAssetLevels();
  }

  onFailure (title: string, message: string): void {
    const notificationTitle = this.translateService.instant(title);
    const notificationMessage = this.translateService.instant(message);

    this.notificationService.showError(notificationMessage, notificationTitle);
  }

  handleNewAssetLevel (): void {

  }
}