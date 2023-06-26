import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../../../shared/services/notification.service';
import { AssetLevelService } from '../../../core/rest/services/asset-level.service';
import { noop, tap } from 'rxjs';
import { Roles } from '../../../../shared/utils/enums';
import { AuthService } from '../../../core/rest/services/auth.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-asset-level-create',
  templateUrl: './asset-level-create.component.html',
  styleUrls: ['./asset-level-create.component.scss']
})
export class AssetLevelCreateComponent implements OnInit {
  createForm!: FormGroup;
  loading = false;
  
  customDescriptionErrorMsgs = [
    {
      key: 'maxlength',
      customKey: 'asset-level-description-max-length'
    }
  ];

  constructor (
    private readonly dialogRef: MatDialogRef<AssetLevelCreateComponent>,
    private readonly formBuilder: FormBuilder,
    private readonly notificationService: NotificationService,
    private readonly assetLevelService: AssetLevelService,
    private readonly authService: AuthService
  ) {}

  buildCreateForm (): void {
    this.createForm = this.formBuilder.group({
      description: new FormControl('', {
        validators: [
          Validators.maxLength(200),
          Validators.required
        ],
        updateOn: 'change'
      })
    });
  }

  ngOnInit (): void {
    this.buildCreateForm();
  }

  onCancel (): void {
    this.dialogRef.close(false);
  }

  onSubmit (): void {    
    if (this.canCreateAssetLevel() === false) {
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
    const newAssetLevel = this.createForm.value;

    this.assetLevelService.createAssetLevel(newAssetLevel)
      .pipe(
        tap((result) => {
          this.loading = false;
          this.notificationService.successNotification(
            'GeneralMessages.successNotificationTitle',
            'AssetLevelCreateComponent.' + result.resultKeys
          );
          this.dialogRef.close(true);
        })
      )
      .subscribe({
        next: noop,
        error: (err) => {
          this.loading = false;
          this.notificationService.showErrorNotification('AssetLevelCreateComponent', err.error.resultKeys)
        }
      });
  }

  canCreateAssetLevel (): boolean {
    const admittedRoles = [Roles.ADMIN];
    return this.authService.checkUserPermissions(admittedRoles);
  }
}
