import { Component, OnInit } from '@angular/core';
import { tap, noop, Subscription } from 'rxjs';
import { AssetSubLevelService } from '../../../core/rest/services/asset-sub-level.service';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../../../../shared/services/notification.service';
import { AssetSubLevelEntity } from '../../../core/models/asset-sub-level-entity.model';
import { InlineActions, alwaysEnabled } from '../../../../shared/components/collapsible-action-bar/collapsible-action-bar.model';
import { Roles } from '../../../../shared/utils/enums';
import { AuthService } from '../../../core/rest/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AssetSubLevelCreateComponent } from '../asset-sub-level-create/asset-sub-level-create.component';
import { AssetSubLevelEditComponent } from '../asset-sub-level-edit/asset-sub-level-edit.component';

@Component({
  selector: 'app-asset-sub-level-list',
  templateUrl: './asset-sub-level-list.component.html',
  styleUrls: ['./asset-sub-level-list.component.scss']
})
export class AssetSubLevelListComponent implements OnInit {
  assetSubLevels: AssetSubLevelEntity[] = [];
  loading = false;
  errorMessage!: string;
  assetSubLevelModalConfig = {
    hasBackdrop: true,
    backdropClass: 'st-dialog-backdrop',
    width: `${Math.min(window.innerWidth / 2, 500)}px`,
    borderRadius: '50%'
  };

  readonly assetSubLevelActions: InlineActions[] = [
    {
      icon: 'edit',
      show: this.canHandleAssetSubLevel.bind(this),
      description: this.translateService.instant('AssetSubLevelListComponent.edit-assetSubLevel'),
      disableCriteria: alwaysEnabled,
      onClick: this.handleEditAssetSubLevel.bind(this)
    },
    {
      icon: 'delete',
      show: this.canHandleAssetSubLevel.bind(this),
      description: this.translateService.instant('AssetSubLevelListComponent.delete-assetSubLevel'),
      disableCriteria: alwaysEnabled,
      onClick: this.handleDeleteAssetSubLevel.bind(this)
    }
  ]

  constructor (
    private readonly assetSubLevelService: AssetSubLevelService,
    private readonly translateService: TranslateService,
    private readonly notificationService: NotificationService,
    private readonly authService: AuthService,
    private readonly matDialog: MatDialog
  ) {}

  canHandleAssetSubLevel (): boolean {
    const admittedRoles = [Roles.ADMIN];
    return this.authService.checkUserPermissions(admittedRoles);
  }

  handleEditAssetSubLevel (assetSubLevel: AssetSubLevelEntity): void {
    if (this.canHandleAssetSubLevel()) {
      this.matDialog
        .open(AssetSubLevelEditComponent, {
          ...this.assetSubLevelModalConfig,
          data: { assetSubLevelId: assetSubLevel.id}
        })
        .afterClosed()
        .pipe(
          tap((result: boolean) => {
            if (result) this.getAssetSubLevels();
          })
        )
        .subscribe();
    } else {
      this.notificationService.failureNotification(
        'GeneralMessages.errorNotificationTitle',
        'GeneralMessages.accessDenied'
      );
    }
  }

  handleDeleteAssetSubLevel (assetSubLevel: AssetSubLevelEntity): void {
    if (this.canHandleAssetSubLevel()) {
      this.assetSubLevelService.deleteAssetSubLevel(assetSubLevel.id)
        .pipe(
          tap((result) => {
            this.loading = false;
            this.notificationService.successNotification(
              'GeneralMessages.successNotificationTitle',
              'AssetSubLevelListComponent.delete.' + result.resultKeys
            );
            this.loading = true;
            this.getAssetSubLevels();
          })
        )
        .subscribe({
          next: noop,
          error: (err) => {
            this.loading = false;
            this.notificationService.failureNotification(
              'GeneralMessages.errorNotificationTitle',
              'AssetSubLevelListComponent.' + err.resultKeys
            );
          }
        })
    } else {
      this.notificationService.failureNotification(
        'GeneralMessages.errorNotificationTitle',
        'GeneralMessages.accessDenied'
      );
    }
  }

  handleNewAssetSubLevel (): void {
    if (this.canHandleAssetSubLevel()) {
      this.matDialog
        .open(
          AssetSubLevelCreateComponent,
          this.assetSubLevelModalConfig
        )
        .afterClosed()
        .pipe(
          tap((value) => {
            if (value) this.getAssetSubLevels();
          })
        )
        .subscribe();
    } else {
      this.notificationService.failureNotification(
        'GeneralMessages.errorNotificationTitle',
        'GeneralMessages.accessDenied'
      );
    }
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
