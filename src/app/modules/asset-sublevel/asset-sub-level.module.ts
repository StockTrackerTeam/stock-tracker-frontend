import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssetSubLevelRoutingModule } from './asset-sub-level-routing.module';
import { AssetSubLevelListComponent } from './asset-sub-level-list/asset-sub-level-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { LoadingIndicatorModule } from '../../../shared/modules/loading-indicator/loading-indicator.module';
import { ButtonModule } from '../../../shared/directives';
import { TableModule } from '../../../shared/modules/table/table.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormErrorsModule } from '../../../shared/components/form-errors/form-errors.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FlexModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { CollapsibleActionBarModule } from '../../../shared/components/collapsible-action-bar/collapsible-action-bar.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmCancelModalModule } from '../../../shared/modules/create-edit-modal/confirm-cancel-modal.module';
import { AssetSubLevelCreateComponent } from './asset-sub-level-create/asset-sub-level-create.component';
import { FormSelectModule } from '../../../shared/controls/form-select/form-select.module';
import { AssetSubLevelEditComponent } from './asset-sub-level-edit/asset-sub-level-edit.component';


@NgModule({
  declarations: [
    AssetSubLevelListComponent,
    AssetSubLevelCreateComponent
  ],
  imports: [
    CommonModule,
    AssetSubLevelRoutingModule,
    TranslateModule,
    LoadingIndicatorModule,
    ButtonModule,
    TableModule,
    ReactiveFormsModule,
    FormErrorsModule,
    MatFormFieldModule,
    MatButtonModule,
    FlexModule,
    MatInputModule,
    MatDividerModule,
    MatIconModule,
    CollapsibleActionBarModule,
    MatDialogModule,
    ConfirmCancelModalModule
  ]
})
export class AssetSubLevelModule { }
