import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent implements OnInit {
  @Input('fromUser') fromUser: string;
  @Input('fromUserAvatar') avatar: string;
  @Input('fromUserId') userId: string;
  @Input('date') date: number;
  @Input('subject') subject: string;
  @Input('message') message: string;
  @Input('index') index: string;

  constructor() {}

  ngOnInit(): void {}

  sliceText(text: string) {
    return text.length > 35 ? `${text.substr(0, 35)}...` : text;
  }
}
