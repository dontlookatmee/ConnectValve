import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile/profile.service';

interface Messages {
  id: string;
  data: {
    fromUser: string;
    fromUserAvatar: string;
    fromUserId: string;
    date: number;
    subject: string;
    message: string;
  };
}
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  messages: Messages[];

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.profileService.getUserMessages().subscribe((messages: Messages[]) => {
      this.messages = messages;
    });
  }
}
