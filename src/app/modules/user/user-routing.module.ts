import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { Roles } from 'src/shared/utils/enums';
import { DeleteUserComponent } from './user-delete/user-delete.component';
import { InactivateUserComponent } from './user-inactivate/user-inactivate.component';
import { NewUserComponent } from './new-user/new-user.component';
import { UserDataComponent } from './user-data/user-data.component';
import { UserListComponent } from './user-list/user-list.component';

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
    component: UserDataComponent,
    canActivate: [AuthGuard],
    data: {
      roleId: [Roles.ADMIN]
    }
  },
  {
    path: ':id/delete',
    component: DeleteUserComponent,
    canActivate: [AuthGuard],
    data: {
      roleId: [Roles.ADMIN]
    }
  },
  {
    path: ':id/inactivate',
    component: InactivateUserComponent,
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
export class UserRoutingModule { }
