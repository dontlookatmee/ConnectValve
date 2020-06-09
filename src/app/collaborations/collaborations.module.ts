import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CollaborationsRoutingModule } from './collaborations-routing.module';
import { CollaborationsListComponent } from './collaborations-list/collaborations-list.component';
import { CollaborationComponent } from './collaboration/collaboration.component';
import { CollaborationChatComponent } from './collaboration-chat/collaboration-chat.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { StartCollaborationButtonComponent } from './start-collaboration-button/start-collaboration-button.component';
import { TimerComponent } from './timer/timer.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CollaborationsListComponent,
    CollaborationComponent,
    CollaborationChatComponent,
    ChatMessageComponent,
    StartCollaborationButtonComponent,
    TimerComponent,
  ],
  imports: [
    CommonModule,
    CollaborationsRoutingModule,
    FormsModule,
    SharedModule,
  ],
})
export class CollaborationsModule {}
