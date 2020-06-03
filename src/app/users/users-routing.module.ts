import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
  },
  {
    path: ':id',
    component: UserProfileComponent,
  },
];

export const UsersRoutingModule = RouterModule.forChild(routes);
