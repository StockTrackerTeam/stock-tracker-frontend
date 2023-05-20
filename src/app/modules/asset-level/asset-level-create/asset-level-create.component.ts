import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../../../core/rest/services/notification.service';
import { AssetLevelService } from '../../../core/rest/services/asset-level.service';
import { noop, tap } from 'rxjs';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

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
      customKey: 'description-max-length'
    }
  ];

  constructor (
    public modalCreateAssetLevel: MdbModalRef<AssetLevelCreateComponent>,
    private readonly formBuilder: FormBuilder,
    private readonly translate: TranslateService,
    private readonly notificationService: NotificationService,
    private readonly assetLevelService: AssetLevelService
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
    this.modalCreateAssetLevel.close();
  }

  onSubmit (): void {
    if (this.createForm?.invalid) {
      const notificationTitle = this.translate.instant('GeneralMessages.errorNotificationTitle');
      const notificationMessage = this.translate.instant('AssetLevelCreateComponent.errorNotificationMessage');

      this.notificationService.showError(notificationMessage, notificationTitle);
      return;
    }

    this.loading = true;
    const newAssetLevel = this.createForm.value;

    this.assetLevelService.createAssetLevel(newAssetLevel)
      .pipe(
        tap((result) => {
          this.loading = false;
          const notificationTitle = this.translate.instant('GeneralMessages.successNotificationTitle');
          const notificationMessage = this.translate.instant('AssetLevelCreateComponent.' + result.resultKeys);
          
          this.notificationService.showSuccess(notificationMessage, notificationTitle);
          this.modalCreateAssetLevel.close();
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
}
