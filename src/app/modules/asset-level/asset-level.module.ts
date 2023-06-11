import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssetLevelRoutingModule } from './asset-level-routing.module';
import { AssetLevelListComponent } from './asset-level-list/asset-level-list.component';
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
import { FormSelectModule } from '../../../shared/controls/form-select/form-select.module';
import { CollapsibleActionBarModule } from '../../../shared/components/collapsible-action-bar/collapsible-action-bar.module';
import { AssetLevelCreateComponent } from './asset-level-create/asset-level-create.component';
import { AssetLevelEditComponent } from './asset-level-edit/asset-level-edit.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateEditModalModule } from '../../../shared/modules/create-edit-modal/create-edit-modal.module';



@NgModule({
  declarations: [
    AssetLevelListComponent,
    AssetLevelCreateComponent,
    AssetLevelEditComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    AssetLevelRoutingModule,
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
    FormSelectModule,
    CollapsibleActionBarModule,
    MatDialogModule,
    CreateEditModalModule
  ]
})
export class AssetLevelModule { }
