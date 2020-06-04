import { Routes, RouterModule } from '@angular/router';
import { MessagesComponent } from './messages/messages.component';

const routes: Routes = [
  {
    path: '',
    component: MessagesComponent,
  },
];

export const InboxRoutingModule = RouterModule.forChild(routes);
