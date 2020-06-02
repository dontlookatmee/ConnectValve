import { Component, OnInit } from '@angular/core';
import {
  ProfileService,
  UsersMeta,
} from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: UsersMeta[];

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.profileService.getUsersProfiles().subscribe((users: UsersMeta[]) => {
      this.users = users;
    });
  }
}
