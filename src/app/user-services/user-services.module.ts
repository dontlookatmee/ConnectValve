import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserServicesRoutingModule } from './user-services-routing.module';
import { ServiceComponent } from './service/service.component';
import { SharedModule } from '../shared/shared.module';
import { CreateComponent } from './create/create.component';

@NgModule({
  declarations: [ServiceComponent, CreateComponent],
  imports: [
    CommonModule,
    UserServicesRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class UserServicesModule {}
