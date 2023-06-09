import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'users',
        loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)
      },
      {
        path: 'asset-levels',
        loadChildren: () => import('./modules/asset-level/asset-level.module').then(m => m.AssetLevelModule)
      },
      {
        path: 'asset-sublevels',
        loadChildren: () => import('./modules/asset-sublevel/asset-sub-level.module').then(m => m.AssetSubLevelModule)
      }
    ]
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
