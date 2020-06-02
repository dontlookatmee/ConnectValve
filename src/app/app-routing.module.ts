import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { UsersModule } from './users/users.module';

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
    path: 'faq',
    loadChildren: () => import('./faq/faq.module').then((m) => m.FaqModule),
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
  {
    path: 'collaborations',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./collaborations/collaborations.module').then(
        (m) => m.CollaborationsModule
      ),
  },
  {
    path: 'users',
    canActivate: [AuthGuard],
    loadChildren: () => import('./users/users.module').then((m) => UsersModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
