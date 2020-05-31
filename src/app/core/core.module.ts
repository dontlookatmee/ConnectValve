import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NavbarComponent } from "./navbar/navbar.component";
import { MessageComponent } from './message/message.component';
import { MessagesComponent } from './messages/messages.component';

@NgModule({
  declarations: [NavbarComponent, MessageComponent, MessagesComponent],
  imports: [CommonModule, RouterModule],
  exports: [NavbarComponent],
})
export class CoreModule {}
