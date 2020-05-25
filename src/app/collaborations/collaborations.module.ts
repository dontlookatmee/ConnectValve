import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollaborationsRoutingModule } from './collaborations-routing.module';
import { CollaborationsListComponent } from './collaborations-list/collaborations-list.component';
import { CollaborationComponent } from './collaboration/collaboration.component';


@NgModule({
  declarations: [CollaborationsListComponent, CollaborationComponent],
  imports: [
    CommonModule,
    CollaborationsRoutingModule
  ]
})
export class CollaborationsModule { }
