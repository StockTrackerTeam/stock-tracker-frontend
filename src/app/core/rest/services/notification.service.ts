import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private readonly toastr: ToastrService
  ) { }

  showSuccess (message: string, title: string): void {
    this.toastr.success(message, title, {
      enableHtml: true,
      positionClass: 'toast-bottom-center'
    });
  }

  showError (message: string, title: string): void {
    this.toastr.error(message, title, {
      enableHtml: true,
      positionClass: 'toast-bottom-center'
    });
  }
}
