import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-cancel-modal',
  templateUrl: './confirm-cancel-modal.component.html',
  styleUrls: ['./confirm-cancel-modal.component.scss']
})
export class ConfirmCancelModalComponent {
  @Input() title!: string;
  @Input() okButton!: string;
  @Input() cancelButton!: string;

  @Output() submitEvent = new EventEmitter<void>();
  @Output() cancelEvent = new EventEmitter<void>();

  constructor () {}

  onSubmit (): void {  
    this.submitEvent.emit();
  }

  onCancel (): void {
    this.cancelEvent.emit();
  }
}
