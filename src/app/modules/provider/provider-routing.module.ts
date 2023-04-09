import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { Roles } from 'src/shared/utils/enums';
import { ProviderListComponent } from './provider-list/provider-list.component';

const routes: Routes = [
  {
    path: '',
    component: ProviderListComponent,
    canActivate: [AuthGuard],
    data: {
      roleId: [Roles.ADMIN, Roles.EMPLOYEE]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProviderRoutingModule { }
