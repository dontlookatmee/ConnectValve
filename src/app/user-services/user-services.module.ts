import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserServicesRoutingModule } from './user-services-routing.module';
import { ServiceComponent } from './service/service.component';
import { SharedModule } from '../shared/shared.module';
import { CreateComponent } from './create/create.component';
import { MyServicesComponent } from './my-services/my-services.component';
import { MyServiceComponent } from './my-services/my-service/my-service.component';

@NgModule({
  declarations: [ServiceComponent, CreateComponent, MyServicesComponent, MyServiceComponent],
  imports: [
    CommonModule,
    UserServicesRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class UserServicesModule {}
