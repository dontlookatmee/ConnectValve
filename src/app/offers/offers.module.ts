import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OffersRoutingModule } from './offers-routing.module';
import { ReceivedComponent } from './received/received.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ReceivedComponent],
  imports: [CommonModule, OffersRoutingModule, SharedModule],
})
export class OffersModule {}
