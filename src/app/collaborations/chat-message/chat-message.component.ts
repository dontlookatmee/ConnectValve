import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css'],
})
export class ChatMessageComponent implements OnInit {
  @Input('name') name: string;
  @Input('message') message: string;
  @Input('date') date: Date;
  @Input('position') position: string;
  @Input('isOnline') isOnline: boolean;
  constructor() {}

  ngOnInit(): void {}
}
