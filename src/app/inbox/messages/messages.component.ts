import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

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

  profileServiceSub: Subscription;

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.profileServiceSub = this.profileService
      .getUserMessages()
      .subscribe((messages: Messages[]) => {
        this.messages = messages.sort((a, b) => b.data.date - a.data.date);
      });
  }

  ngOnDestroy(): void {
    this.profileServiceSub.unsubscribe();
  }
}
