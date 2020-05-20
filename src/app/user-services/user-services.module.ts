import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserServicesRoutingModule } from './user-services-routing.module';
import { ServiceComponent } from './service/service.component';


@NgModule({
  declarations: [ServiceComponent],
  imports: [
    CommonModule,
    UserServicesRoutingModule
  ]
})
export class UserServicesModule { }
