import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { ProfileService, User } from 'src/app/services/profile/profile.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent implements OnInit {
  @HostBinding('style.margin')
  margin: string = '0 auto';

  @Input('name') name: string;
  @Input('avatar') avatar: string;
  @Input('desc') description: string;
  @Input('status') status: string;
  @Input('userId') userId: string;
  @Input('votes') votes: string[];
  hasVoted: boolean;
  user: User;
  loggedUserId: string;
  constructor(
    private profileService: ProfileService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loggedUserId = this.authService.getUserId();

    this.profileService
      .getUserProfile(this.userId)
      .subscribe((user: User) => (this.user = user));
  }

  handleUserVote() {
    this.profileService
      .getUserProfile(this.userId)
      .pipe(take(1))
      .subscribe((user: User) => {
        if (user.uid === this.loggedUserId) {
        } else if (user.votes.includes(this.loggedUserId)) {
          this.profileService.removeVote(this.userId);
          this.hasVoted = false;
          console.log(this.hasVoted);
        } else {
          this.profileService.addVote(this.userId);
          this.hasVoted = true;
          console.log(this.hasVoted);
        }
      });
  }
}
