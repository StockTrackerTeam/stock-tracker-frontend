import { Component, OnInit } from '@angular/core';
import { AssetLevelService } from '../../../core/rest/services/asset-level.service';
import { tap, noop, Subscription } from 'rxjs';
import { AssetLevelEntity } from '../../../core/models/asset-level-entity.model';
import { InlineActions, alwaysEnabled } from '../../../../shared/components/collapsible-action-bar/collapsible-action-bar.model';
import { TranslateService } from '@ngx-translate/core';
import { Roles } from '../../../../shared/utils/enums';
import { AuthService } from '../../../core/rest/services/auth.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AssetLevelCreateComponent } from '../asset-level-create/asset-level-create.component';
import { AssetLevelEditComponent } from '../asset-level-edit/asset-level-edit.component';

@Component({
  selector: 'app-asset-level-list',
  templateUrl: './asset-level-list.component.html',
  styleUrls: ['./asset-level-list.component.scss']
})
export class AssetLevelListComponent implements OnInit {
  assetLevels: AssetLevelEntity[] = []
  errorMessage!: string;
  loading = false;

  readonly assetLevelActions: InlineActions[] = [
    {
      icon: 'edit',
      show: this.canHandleAssetLevel.bind(this),
      description: this.translateService.instant('AssetLevelListComponent.edit-assetLevel'),
      disableCriteria: alwaysEnabled,
      onClick: this.handleEditAssetLevel.bind(this)
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
    private readonly translateService: TranslateService,
    private readonly authService: AuthService,
    private readonly notificationService: NotificationService,
    private readonly modalService: MdbModalService
  ) {}

  canHandleAssetLevel (): boolean {
    const admittedRoles = [Roles.ADMIN];
    return this.authService.checkUserPermissions(admittedRoles);
  }

  private handleEditAssetLevel (assetLevel: AssetLevelEntity): void {
    if (this.canHandleAssetLevel()) {
      this.modalService
        .open(AssetLevelEditComponent, {
          data: {assetLevelId: assetLevel.id}
        })
        .onClose.subscribe(() => this.getAssetLevels());
    } else {
      this.notificationService.failureNotification(
        'GeneralMessages.errorNotificationTitle',
        'GeneralMessages.accessDenied'
      );
    }
  }

  private handleDeleteAssetLevel (AssetLevel: AssetLevelEntity): void {
    if (this.canHandleAssetLevel()) {
      this.assetLevelService.deleteAssetLevel(AssetLevel.id)
        .pipe(
          tap((result) => {
            this.loading = false;
            this.notificationService.successNotification(
              'GeneralMessages.successNotificationTitle',
              'AssetLevelListComponent.delete.' + result.resultKeys
            );
            this.loading = true;
            this.getAssetLevels();
          })
        )
        .subscribe({
          next: noop,
          error: (err) => {
            this.loading = false;
            this.notificationService.failureNotification(
              'GeneralMessages.errorNotificationTitle',
              'AssetLevelListComponent.' + err.resultKeys
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


  ngOnInit(): void {
    this.getAssetLevels();
  }

  getAssetLevels (): Subscription {
    return this.assetLevelService.getAssetLevels()
      .pipe(
        tap(data => {
          this.assetLevels = data;
          this.loading = false;
        })
      )
      .subscribe({
        next: noop,
        error: err => this.errorMessage = err
      });
  }

  handleNewAssetLevel (): void {
    if (this.canHandleAssetLevel()) {
      this.modalService
        .open(AssetLevelCreateComponent)
        .onClose.subscribe(() => this.getAssetLevels());
    } else {
      this.notificationService.failureNotification(
        'GeneralMessages.errorNotificationTitle',
        'GeneralMessages.accessDenied'
      );
    }
  }
}
