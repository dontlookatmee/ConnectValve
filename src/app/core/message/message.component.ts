import { Component, OnInit, Input } from '@angular/core';
import { CollaborationService } from 'src/app/services/collaboration/collaboration.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProfileService, User } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent implements OnInit {
  @Input('fromUser') fromUser: string;
  @Input('toUser') toUser: string;
  @Input('cbId') cbId: string;

  fromUserName: string;
  toUserName: string;

  constructor(
    private cbService: CollaborationService,
    private router: Router,
    private authService: AuthService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.profileService
      .getUserProfile(this.fromUser)
      .subscribe((user: User) => {
        this.fromUserName = user.name;
      });
    this.profileService.getUserProfile(this.toUser).subscribe((user: User) => {
      this.toUserName = user.name;
    });
  }

  handleJoinCb() {
    const userId = this.authService.getUserId();
    this.cbService.addUserToCollaboration(this.cbId, userId).then((x) => {
      this.router.navigate(['collaborations', this.cbId]);
    });
  }
}
