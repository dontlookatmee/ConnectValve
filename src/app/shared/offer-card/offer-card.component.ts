import { Component, OnInit, Input } from '@angular/core';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { UserServicesService } from 'src/app/services/user-services/user-services.service';

interface User {
  avatar: string;
  description: string;
  email: string;
  name: string;
  last_changed: Date;
  password: string;
  services: [];
  status: string;
  uid: string;
}

interface Service {
  id: string;
  data: {
    category: string;
    description: string;
    image: string;
    price: number;
    title: string;
    uid: string;
    name: string;
  };
}

@Component({
  selector: 'app-offer-card',
  templateUrl: './offer-card.component.html',
  styleUrls: ['./offer-card.component.css'],
})
export class OfferCardComponent implements OnInit {
  @Input('note') note: string;
  @Input('price') price: number;
  @Input('service') service: string;
  @Input('status') status: string;
  @Input('time') time: string;
  @Input('toUser') toUser: string;
  @Input('fromUser') fromUser: string;

  userProfile: User;
  offerServiceInfo: Service;

  constructor(
    private profileService: ProfileService,
    private userServices: UserServicesService
  ) {}

  ngOnInit(): void {
    this.profileService
      .getUserProfile(this.fromUser)
      .subscribe((user: User) => {
        this.userProfile = user;
      });

    this.userServices.getService(this.service).subscribe((service: Service) => {
      this.offerServiceInfo = service;
    });
  }
}
