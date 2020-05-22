import { Routes, RouterModule } from '@angular/router';
import { ReceivedComponent } from './received/received.component';

const routes: Routes = [
  {
    path: 'received',
    component: ReceivedComponent,
  },
];

export const OffersRoutingModule = RouterModule.forChild(routes);
