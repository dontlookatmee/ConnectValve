import { Component, OnInit } from '@angular/core';
import {
  ProfileService,
  UsersMeta,
  User,
} from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: User[];

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.profileService.getUsersProfiles().subscribe((users: User[]) => {
      this.users = users.sort((a: any, b: any) => {
        return a.name.localeCompare(b.name);
      });
    });
  }
}
