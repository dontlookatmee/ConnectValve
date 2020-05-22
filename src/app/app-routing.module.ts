import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'services',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./user-services/user-services.module').then(
        (m) => m.UserServicesModule
      ),
  },
  {
    path: 'offers',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./offers/offers.module').then((m) => m.OffersModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
