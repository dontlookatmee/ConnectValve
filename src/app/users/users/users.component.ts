import { Component, OnInit } from '@angular/core';
import {
  ProfileService,
  UsersMeta,
  User,
} from 'src/app/services/profile/profile.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: User[];

  userProfileSub: Subscription;

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.userProfileSub = this.profileService
      .getUsersProfiles()
      .subscribe((users: User[]) => {
        this.users = users.sort((a: User, b: User) => {
          return b.votes.length - a.votes.length;
        });
      });
  }

  ngOnDestroy() {
    this.userProfileSub.unsubscribe();
  }
}
