import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private readonly toastr: ToastrService,
    private readonly translate: TranslateService
  ) { }

  showSuccess (message: string, title: string): void {
    this.toastr.success(message, title, {
      enableHtml: true,
      positionClass: 'toast-bottom-center',
      progressBar: true
    });
  }

  showError (message: string, title: string): void {
    this.toastr.error(message, title, {
      enableHtml: true,
      positionClass: 'toast-bottom-center'
    });
  }

  showErrorNotification (component: string, resultKeys: string[]) {
    const notificationTitle = this.translate.instant(`${component}.errorNotificationTitle`);
    let notificationMessage = '';
    for(const key of resultKeys) {
      notificationMessage += `<span>${this.translate.instant(`${component}.` + key)}</span> <br />`;
    }
    
    this.showError(notificationMessage, notificationTitle);
  }
}
