import { Routes, RouterModule } from '@angular/router';
import { CollaborationsListComponent } from './collaborations-list/collaborations-list.component';
import { CollaborationChatComponent } from './collaboration-chat/collaboration-chat.component';
import { ChatGuard } from './chat.guard';

const routes: Routes = [
  {
    path: 'recived',
    component: CollaborationsListComponent,
  },
  {
    path: ':id',
    canActivate: [ChatGuard],
    component: CollaborationChatComponent,
  },
];

export const CollaborationsRoutingModule = RouterModule.forChild(routes);
