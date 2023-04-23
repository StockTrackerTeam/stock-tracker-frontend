import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { Roles } from 'src/shared/utils/enums';
import { UserViewComponent } from '../user/user-view/user-view.component';
import { NewUserComponent } from './new-user/new-user.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
    canActivate: [AuthGuard],
    data: {
      roleId: [Roles.ADMIN]
    }
  },
  {
    path: 'create',
    component: NewUserComponent,
    canActivate: [AuthGuard],
    data: {
      roleId: [Roles.ADMIN]
    }
  },
  {
    path: ':id/view',
    component: UserViewComponent,
    canActivate: [AuthGuard],
    data: {
      roleId: [Roles.ADMIN]
    }
  },
  {
    path: 'settings',
    component: UserSettingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
