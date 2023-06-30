import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AssetLevelEntity } from '../../../core/models/asset-level-entity.model';
import { Subscription, noop, tap } from 'rxjs';
import { AssetLevelService } from '../../../core/rest/services/asset-level.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { Roles } from '../../../../shared/utils/enums';
import { AuthService } from '../../../core/rest/services/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-asset-level-edit',
  templateUrl: './asset-level-edit.component.html',
  styleUrls: ['./asset-level-edit.component.scss']
})
export class AssetLevelEditComponent implements OnInit {
  editLevelForm!: FormGroup;
  currentAssetLevel!: AssetLevelEntity;
  loading = false;

  customDescriptionErrorMsgs = [
    {
      key: 'maxlength',
      customKey: 'asset-level-description-max-length'
    }
  ];

  constructor (
    @Inject(MAT_DIALOG_DATA) private data: { assetLevelId: number },
    private readonly dialogRef: MatDialogRef<AssetLevelEditComponent>,
    private readonly formBuilder: FormBuilder,
    private readonly assetLevelService: AssetLevelService,
    private readonly notificationService: NotificationService,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getAssetLevel(this.data.assetLevelId);
  }

  buildForm (assetLevel: AssetLevelEntity): void {
    this.editLevelForm = this.formBuilder.group({
      description: new FormControl(assetLevel.description, {
        validators: [
          Validators.maxLength(200),
          Validators.required
        ],
        updateOn: 'change'
      })
    });

    this.editLevelForm.get('description')?.valueChanges
      .pipe(
        tap(value => {
          const currentDescription = this.currentAssetLevel.description;
          if (currentDescription === value) 
            this.editLevelForm.get('description')?.setErrors({'asset-level-description-same-value': true});          
        })
      )
      .subscribe({
        next: noop,
        error: err => console.log(err)
      });
  }

  getAssetLevel (assetLevelId: number): Subscription {
    return this.assetLevelService.getAssetLevel(assetLevelId)
      .pipe(
        tap(result => {
          this.currentAssetLevel = result;
          this.buildForm(this.currentAssetLevel);
          })
        )
        .subscribe({
          next: noop,
          error: err => console.log(err)
        })
  }

  onSubmit (): void {
    if (this.canEditAssetLevel() === false) {
      return this.notificationService.failureNotification(
        'GeneralMessages.errorNotificationTitle',
        'GeneralMessages.accessDenied'
      );
    }

    if (this.editLevelForm?.invalid) {
      return this.notificationService.failureNotification(
        'GeneralMessages.errorNotificationTitle',
        'GeneralMessages.errorNotificationMessage'
      );
    }

    if (this.editLevelForm?.pristine) {
      return this.notificationService.failureNotification(
        'GeneralMessages.errorNotificationTitle',
        'AssetLevelEditComponent.asset-level-description-same-value'
      );
    }

    this.assetLevelService.updateAssetLevel(this.currentAssetLevel.id, this.editLevelForm.value)
      .pipe(
        tap((result) => {
          this.notificationService.successNotification(
            'GeneralMessages.successNotificationTitle',
            'AssetLevelEditComponent.' + result.resultKeys
          );
          this.dialogRef.close(true);
        })
      )
      .subscribe({
        next: noop,
        error: (err) => this.notificationService.showErrorNotification('AssetLevelEditComponent', err.error.resultKeys)
      })
  }

  onCancel (): void {
    this.dialogRef.close(false);
  }

  canEditAssetLevel (): boolean {
    const admittedRoles = [Roles.ADMIN];
    return this.authService.checkUserPermissions(admittedRoles);
  }
}
