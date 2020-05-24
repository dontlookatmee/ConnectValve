import { Routes, RouterModule } from '@angular/router';
import { ServiceComponent } from './service/service.component';
import { CreateComponent } from './create/create.component';
import { MyServicesComponent } from './my-services/my-services.component';

const routes: Routes = [
  {
    path: 'create',
    component: CreateComponent,
  },
  {
    path: 'my-services',
    component: MyServicesComponent,
  },
  {
    path: ':id',
    component: ServiceComponent,
  },
];

export const UserServicesRoutingModule = RouterModule.forChild(routes);
