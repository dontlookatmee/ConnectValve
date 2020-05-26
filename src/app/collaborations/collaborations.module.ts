import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollaborationsRoutingModule } from './collaborations-routing.module';
import { CollaborationsListComponent } from './collaborations-list/collaborations-list.component';
import { CollaborationComponent } from './collaboration/collaboration.component';
import { CollaborationChatComponent } from './collaboration-chat/collaboration-chat.component';

@NgModule({
  declarations: [
    CollaborationsListComponent,
    CollaborationComponent,
    CollaborationChatComponent,
  ],
  imports: [CommonModule, CollaborationsRoutingModule],
})
export class CollaborationsModule {}
