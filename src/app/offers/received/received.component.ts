import { Component, OnInit } from '@angular/core';
import { OffersService } from 'src/app/services/offers/offers.service';
import { Subscription } from 'rxjs';

interface Offer {
  id: string;
  data: {
    collaborationCreated: boolean;
    fromUser: string;
    note: string;
    price: number;
    service: string;
    status: string;
    time: number;
    toUser: string;
  };
}

@Component({
  selector: 'app-received',
  templateUrl: './received.component.html',
  styleUrls: ['./received.component.css'],
})
export class ReceivedComponent implements OnInit {
  offersReceived: Offer[];
  isDataLoaded: boolean = false;
  offerServiceSub: Subscription;

  constructor(private offersService: OffersService) {}

  ngOnInit(): void {
    this.offerServiceSub = this.offersService
      .getReceivedOffers()
      .subscribe((offer: Offer[]) => {
        this.offersReceived = offer;
        this.isDataLoaded = true;
      });
  }

  ngOnDestroy(): void {
    this.offerServiceSub.unsubscribe();
  }
}
