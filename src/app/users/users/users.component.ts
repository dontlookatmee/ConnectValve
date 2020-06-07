import { Component, OnInit } from '@angular/core';
import {
  ProfileService,
  UsersMeta,
  User,
} from 'src/app/services/profile/profile.service';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

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

  handleTerm(term: string) {
    this.userProfileSub = this.profileService
      .getUsersProfiles()
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((users: User[]) => {
        this.users = users
          .filter(
            (user: User) =>
              user.description.toLowerCase().includes(term.toLowerCase()) ||
              user.name.toLowerCase().includes(term.toLowerCase())
          )
          .sort((a: User, b: User) => {
            return b.votes.length - a.votes.length;
          });
      });
  }

  ngOnDestroy() {
    this.userProfileSub.unsubscribe();
  }
}
