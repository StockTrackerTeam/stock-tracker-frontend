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
    private readonly notificationService: NotificationService,
    private readonly authService: AuthService,
    private readonly matDialog: MatDialog
  ) {}

  canHandleAssetSubLevel (): boolean {
    const admittedRoles = [Roles.ADMIN];
    return this.authService.checkUserPermissions(admittedRoles);
  }

  handleEditAssetSubLevel (): void {
    alert('Future edit');
  }

  handleDeleteAssetSubLevel (): void {
    alert('Future delete');
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
