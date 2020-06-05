import { Component, OnInit, Input } from '@angular/core';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { UserServicesService } from 'src/app/services/user-services/user-services.service';
import { OffersService } from 'src/app/services/offers/offers.service';
import { CollaborationService } from 'src/app/services/collaboration/collaboration.service';
import { Subscription } from 'rxjs';

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
  @Input('serviceId') serviceId: string;
  @Input('status') status: string;
  @Input('time') time: string;
  @Input('toUser') toUser: string;
  @Input('fromUser') fromUser: string;
  @Input('offerId') offerId: string;
  @Input('isReceiver') isReceiver: boolean = false;

  userProfile: User;
  offerServiceInfo: Service;
  feedback: { visible?: boolean; status?: string; msg?: string };

  profileServiceSub: Subscription;
  userServiceSub: Subscription;

  constructor(
    private profileService: ProfileService,
    private userServices: UserServicesService,
    private offerService: OffersService,
    private cbService: CollaborationService
  ) {}

  ngOnInit(): void {
    this.profileServiceSub = this.profileService
      .getUserProfile(this.fromUser)
      .subscribe((user: User) => {
        this.userProfile = user;
      });

    this.userServiceSub = this.userServices
      .getService(this.serviceId)
      .subscribe((service: Service) => {
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
    const data = {
      allowedPeople: [this.fromUser, this.toUser],
      createdAt: '',
      expiresAt: '',
      fromOffer: this.offerId,
      fromUser: this.fromUser,
      image: this.offerServiceInfo.data.image,
      joinedPeople: [],
      serviceId: this.offerServiceInfo.id,
      status: 'pending',
      time: this.time,
      title: this.offerServiceInfo.data.title,
      toUser: this.toUser,
    };

    this.offerService
      .updateOffer(this.offerId, {
        collaborationCreated: true,
      })
      .then((x) => {
        this.cbService.createCollaboration(data);
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

  ngOnDestroy(): void {
    this.profileServiceSub.unsubscribe();
    this.userServiceSub.unsubscribe();
  }
}
