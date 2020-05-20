import { Routes, RouterModule } from '@angular/router';
import { ServiceComponent } from './service/service.component';

const routes: Routes = [
  {
    path: ':id',
    component: ServiceComponent,
  },
];

export const UserServicesRoutingModule = RouterModule.forChild(routes);
