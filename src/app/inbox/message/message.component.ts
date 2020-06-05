import { Component, OnInit, Input } from '@angular/core';
import { ProfileService, User } from 'src/app/services/profile/profile.service';
import { Subscription } from 'rxjs';

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
  @Input('index') index: number;
  @Input('msgId') msgId: string;

  user: User;

  userProfileSub: Subscription;

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.userProfileSub = this.profileService
      .getUserProfile(this.userId)
      .subscribe((user: User) => (this.user = user));
  }

  sliceText(text: string) {
    return text.length > 35 ? `${text.substr(0, 35)}...` : text;
  }

  handleDeleteMsg() {
    console.log('message deleted');
    this.profileService.deleteUserMsg(this.msgId);
  }

  ngOnDestroy(): void {
    this.userProfileSub.unsubscribe();
  }
}
