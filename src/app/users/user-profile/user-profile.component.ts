import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService, User } from 'src/app/services/profile/profile.service';
import {
  UserServicesService,
  ServicesMeta,
} from 'src/app/services/user-services/user-services.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user: User;
  services: ServicesMeta[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private profileService: ProfileService,
    private userServices: UserServicesService
  ) {}

  ngOnInit(): void {
    const path = this.activatedRoute.snapshot.paramMap.get('id');
    this.profileService.getUserProfile(path).subscribe((user: User) => {
      this.user = user;
    });

    this.userServices
      .getUserServices(path)
      .subscribe((services: ServicesMeta[]) => {
        this.services = services;
      });
  }
}
