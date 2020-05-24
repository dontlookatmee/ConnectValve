import { Component, OnInit, Input } from '@angular/core';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { UserServicesService } from 'src/app/services/user-services/user-services.service';
import { OffersService } from 'src/app/services/offers/offers.service';

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
  @Input('collaboration') collaboration: boolean;
  @Input('note') note: string;
  @Input('price') price: number;
  @Input('service') service: string;
  @Input('status') status: string;
  @Input('time') time: string;
  @Input('toUser') toUser: string;
  @Input('fromUser') fromUser: string;
  @Input('offerId') offerId: string;
  @Input('isReceiver') isReceiver: boolean = false;

  userProfile: User;
  offerServiceInfo: Service;
  feedback: { visible?: boolean; status?: string; msg?: string };

  constructor(
    private profileService: ProfileService,
    private userServices: UserServicesService,
    private offerService: OffersService
  ) {
    console.log('feedback ' + this.feedback);
  }

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

  accepOffer() {
    this.offerService.updateOffer(this.offerId, { status: 'accepted' });
  }

  declineOffer() {
    this.offerService.updateOffer(this.offerId, { status: 'declined' });
  }

  deleteOffer() {
    const confirmation = confirm('Are you sure ?');
    if (confirmation) {
      this.offerService.deleteOffer(this.offerId);
    }
  }

  handleCollaborate() {
    this.offerService.updateOffer(this.offerId, {
      collaborationCreated: true,
    });
  }

  updateFeedback(visible: boolean, status?: string, msg?: string): {} {
    const data = {
      visible,
      status,
      msg,
    };

    return data;
  }
}
