import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {
    path: '',
    component: AboutComponent,
  },
];

export const AboutRoutingModule = RouterModule.forChild(routes);
