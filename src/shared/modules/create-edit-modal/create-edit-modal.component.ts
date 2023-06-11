import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-create-edit-modal',
  templateUrl: './create-edit-modal.component.html',
  styleUrls: ['./create-edit-modal.component.scss']
})
export class CreateEditModalComponent {
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
