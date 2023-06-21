import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetSubLevelListComponent } from './asset-sub-level-list/asset-sub-level-list.component';
import { AuthGuard } from '../../../shared/guards/auth.guard';
import { Roles } from '../../../shared/utils/enums';

const routes: Routes = [
  {
    path: '',
    component: AssetSubLevelListComponent,
    canActivate: [AuthGuard],
    data: {
      roleId: [Roles.ADMIN]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetSubLevelRoutingModule { }
