import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AssetSubLevelEntity } from '../../../core/models/asset-sub-level-entity.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AssetSubLevelService } from '../../../core/rest/services/asset-sub-level.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { AuthService } from '../../../core/rest/services/auth.service';
import { Observable, Subscription, noop, tap } from 'rxjs';
import { Roles } from '../../../../shared/utils/enums';
import { AssetLevelService } from '../../../core/rest/services/asset-level.service';
import { AssetLevelEntity } from '../../../core/models/asset-level-entity.model';

@Component({
  selector: 'app-asset-sub-level-edit',
  templateUrl: './asset-sub-level-edit.component.html',
  styleUrls: ['./asset-sub-level-edit.component.scss']
})
export class AssetSubLevelEditComponent implements OnInit {
  editSubLevelForm!: FormGroup;
  currentAssetSubLevel!: AssetSubLevelEntity;
  loading = false;
  assetLevels$!: Observable<AssetLevelEntity[]>;
  customDescriptionErrorMsgs = [
    {
      key: 'maxlength',
      customKey: 'asset-sublevel-description-max-length'
    },
    {
      key: 'asset-sublevel-fields-same-value',
      customKey: 'asset-sublevel-fields-same-value'
    }
  ];

  constructor (
    @Inject(MAT_DIALOG_DATA) private data: { assetSubLevelId: number },
    private readonly dialogRef: MatDialogRef<AssetSubLevelEditComponent>,
    private readonly formBuilder: FormBuilder,
    private readonly assetSubLevelService: AssetSubLevelService,
    private readonly assetLevelService: AssetLevelService,
    private readonly notificationService: NotificationService,
    private readonly authService: AuthService
  ) {}

  get assetLevel(): FormControl {
    return this.editSubLevelForm.get('assetLevel') as FormControl;
  }

  ngOnInit(): void {
    this.assetLevels$ = this.assetLevelService.getAssetLevels();
    this.getAssetSubLevel(this.data.assetSubLevelId);
  }

  canEditAssetSubLevel (): boolean {
    const admittedRoles = [Roles.ADMIN];
    return this.authService.checkUserPermissions(admittedRoles);
  }

  buildForm (assetSubLevel: AssetSubLevelEntity): void {
    this.editSubLevelForm = this.formBuilder.group({
      description: new FormControl(assetSubLevel.description, {
        validators: [
          Validators.maxLength(200)
        ],
        updateOn: 'change'
      }),
      assetLevel: new FormControl(assetSubLevel.levelId, {
        updateOn: 'change'
      })
    });

    this.editSubLevelForm.get('description')?.valueChanges
      .pipe(
        tap(value => {
          const currentDescription = this.currentAssetSubLevel.description;
          if (currentDescription === value)
            this.editSubLevelForm.markAsPristine()
        })
      )
      .subscribe({
        next: noop,
        error: err => console.log(err)
      })

    this.editSubLevelForm.get('assetLevel')?.valueChanges
      .pipe(
        tap(value => {
          const currentAssetLevel = this.currentAssetSubLevel.levelId;
          if (currentAssetLevel === value)
            this.editSubLevelForm.markAsPristine()
        })
      )
      .subscribe({
        next: noop,
        error: err => console.log(err)
      })
  }

  getAssetSubLevel (assetSubLevelId: number): Subscription {
    this.loading = true;

    return this.assetSubLevelService.getAssetSubLevel(assetSubLevelId)
      .pipe(
        tap(result => {
          this.currentAssetSubLevel = result;
          this.buildForm(this.currentAssetSubLevel);
          this.loading = false;
        })
      )
      .subscribe({
        next: noop,
        error: err => console.log(err)
      })
  }

  onSubmit (): void {
    if (this.canEditAssetSubLevel() === false) {
      return this.notificationService.failureNotification(
        'GeneralMessages.errorNotificationTitle',
        'GeneralMessages.errorNotificationMessage'
      );
    }

    if (this.editSubLevelForm?.invalid) {
      return this.notificationService.failureNotification(
        'GeneralMessages.errorNotificationTitle',
        'GeneralMessages.errorNotificationMessage'
      );
    }

    if ( this.editSubLevelForm?.pristine) {
      return this.notificationService.failureNotification(
        'GeneralMessages.errorNotificationTitle',
        'AssetSubLevelEditComponent.asset-sublevel-fields-same-value'
      );
    }

    const updatedAssetSubLevel = {
      ...this.editSubLevelForm.value,
      levelId: this.editSubLevelForm.controls['assetLevel'].value
    }

    this.assetSubLevelService.updateAssetSubLevel(this.currentAssetSubLevel.id, updatedAssetSubLevel)
      .pipe(
        tap((result) => {
          this.notificationService.successNotification(
            'GeneralMessages.successNotificationTitle',
            'AssetSubLevelEditComponent.' + result.resultKeys
          );
          this.dialogRef.close(true);
        })
      )
      .subscribe({
        next: noop,
        error: (err) => this.notificationService.showErrorNotification('AssetSubLevelEditComponent', err.error.resultKeys)
      })
  }

  onCancel (): void {
    this.dialogRef.close(false);
  }
}
