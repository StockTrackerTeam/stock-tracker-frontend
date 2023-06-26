import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from '../../../../shared/services/notification.service';
import { AssetSubLevelService } from '../../../core/rest/services/asset-sub-level.service';
import { AuthService } from '../../../core/rest/services/auth.service';
import { AssetLevelService } from '../../../core/rest/services/asset-level.service';
import { Observable, noop, tap } from 'rxjs';
import { AssetLevelEntity } from '../../../core/models/asset-level-entity.model';
import { Roles } from '../../../../shared/utils/enums';

@Component({
  selector: 'app-asset-sub-level-create',
  templateUrl: './asset-sub-level-create.component.html',
  styleUrls: ['./asset-sub-level-create.component.scss']
})
export class AssetSubLevelCreateComponent implements OnInit {
  createForm!: FormGroup;
  loading = false;
  assetLevels$!: Observable<AssetLevelEntity[]>;

  customDescriptionErrorMsgs = [
    {
      key: 'maxlength',
      customKey: 'asset-sublevel-description-max-length'
    }
  ]

  constructor (
    private readonly dialogRef: MatDialogRef<AssetSubLevelCreateComponent>,
    private readonly formBuilder: FormBuilder,
    private readonly notificationService: NotificationService,
    private readonly assetSubLevelService: AssetSubLevelService,
    private readonly authService: AuthService,
    private readonly assetLevelService: AssetLevelService
  ) {}

  get assetLevel(): FormControl {
    return this.createForm.get('assetLevel') as FormControl;
  }

  buildCreateForm (): void {
    this.createForm = this.formBuilder.group({
      description: new FormControl('', {
        validators: [
          Validators.maxLength(200),
          Validators.required
        ],
        updateOn: 'change'
      }),
      assetLevel: new FormControl('', {
        validators: [
          Validators.required
        ],
        updateOn: 'change'
      })
    })
  }

  ngOnInit (): void {
    this.buildCreateForm();
    this.assetLevels$ = this.assetLevelService.getAssetLevels();
  }

  canCreateAssetSubLevel (): boolean {
    const admittedRoles = [Roles.ADMIN];
    return this.authService.checkUserPermissions(admittedRoles);
  }

  onSubmit (): void {
    if (this.canCreateAssetSubLevel() === false) {
      return this.notificationService.failureNotification(
        'GeneralMessages.errorNotificationTitle',
        'GeneralMessages.accessDenied'
      );
    }

    if (this.createForm?.invalid) {
      return this.notificationService.failureNotification(
        'GeneralMessages.errorNotificationTitle',
        'GeneralMessages.errorNotificationMessage'
      );
    }

    this.loading = true;
    const newAssetSubLevel = {
      ...this.createForm.value,
      levelId: this.createForm.controls['assetLevel'].value
    }

    this.assetSubLevelService.createAssetSubLevel(newAssetSubLevel)
      .pipe(
        tap((result) => {
          this.loading = false;
          this.notificationService.successNotification(
            'GeneralMessages.successNotificationTitle',
            'AssetSubLevelCreateComponent.' + result.resultKeys
          );
          this.dialogRef.close(true);
        })
      )
      .subscribe({
        next: noop,
        error: (err) => {
          this.loading = false;
          this.notificationService.showErrorNotification('AssetSubLevelCreateComponent', err.error.resultKeys)
        }
      });
  }

  onCancel (): void {
    this.dialogRef.close(false);
  }
}
