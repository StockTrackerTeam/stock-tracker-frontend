import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetLevelListComponent } from './asset-level-list/asset-level-list.component';
import { AuthGuard } from '../../guards/auth.guard';
import { Roles } from '../../../shared/utils/enums';
import { AssetLevelCreateComponent } from './asset-level-create/asset-level-create.component';


const routes: Routes = [
  {
    path: '',
    component: AssetLevelListComponent,
    canActivate: [AuthGuard],
    data: {
      roleId: [Roles.ADMIN]
    }
  },
  {
    path: 'create',
    component: AssetLevelCreateComponent,
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
export class AssetLevelRoutingModule { }
