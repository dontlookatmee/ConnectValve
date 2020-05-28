import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CollaborationsRoutingModule } from './collaborations-routing.module';
import { CollaborationsListComponent } from './collaborations-list/collaborations-list.component';
import { CollaborationComponent } from './collaboration/collaboration.component';
import { CollaborationChatComponent } from './collaboration-chat/collaboration-chat.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';

@NgModule({
  declarations: [
    CollaborationsListComponent,
    CollaborationComponent,
    CollaborationChatComponent,
    ChatMessageComponent,
  ],
  imports: [CommonModule, CollaborationsRoutingModule, FormsModule],
})
export class CollaborationsModule {}
