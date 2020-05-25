import { Routes, RouterModule } from '@angular/router';
import { CollaborationsListComponent } from './collaborations-list/collaborations-list.component';

const routes: Routes = [
  {
    path: 'created',
    component: CollaborationsListComponent,
  },
];

export const CollaborationsRoutingModule = RouterModule.forChild(routes);
