import { Routes, RouterModule } from '@angular/router';
import { ReceivedComponent } from './received/received.component';
import { SentComponent } from './sent/sent.component';

const routes: Routes = [
  {
    path: 'received',
    component: ReceivedComponent,
  },
  {
    path: 'sent',
    component: SentComponent,
  },
];

export const OffersRoutingModule = RouterModule.forChild(routes);
