import { Routes, RouterModule } from '@angular/router';
import { ServiceComponent } from './service/service.component';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
  {
    path: 'create',
    component: CreateComponent,
  },
  {
    path: ':id',
    component: ServiceComponent,
  },
];

export const UserServicesRoutingModule = RouterModule.forChild(routes);
