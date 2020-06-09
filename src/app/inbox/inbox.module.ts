import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InboxRoutingModule } from './inbox-routing.module';
import { MessagesComponent } from './messages/messages.component';
import { MessageComponent } from './message/message.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [MessagesComponent, MessageComponent],
  imports: [CommonModule, InboxRoutingModule, SharedModule],
})
export class InboxModule {}
