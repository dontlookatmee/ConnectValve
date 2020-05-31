import { RouterModule, Routes } from '@angular/router';
import { FaqComponent } from './faq/faq.component';

const routes: Routes = [
  {
    path: '',
    component: FaqComponent,
  },
];

export const FaqRoutingModule = RouterModule.forChild(routes);
