import { Component, Input } from '@angular/core';
import { CollapsibleRowData, InlineActions } from './collapsible-action-bar.model';

@Component({
  selector: 'app-collapsible-action-bar',
  templateUrl: './collapsible-action-bar.component.html',
  styleUrls: ['./collapsible-action-bar.component.scss']
})
export class CollapsibleActionBarComponent {
  @Input() inlineActions!: InlineActions[];
  @Input() row: CollapsibleRowData;
  @Input() disableCollapse!: boolean;
}
