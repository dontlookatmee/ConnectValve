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
  selector: 'app-sent',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.css'],
})
export class SentComponent implements OnInit {
  offersSent: Offer[];
  isDataLoaded: boolean = false;

  offerServiceSub: Subscription;

  constructor(private offersService: OffersService) {}

  ngOnInit(): void {
    this.offerServiceSub = this.offersService
      .getSentOffers()
      .subscribe((offers: Offer[]) => {
        this.offersSent = offers;
        this.isDataLoaded = true;
      });
  }

  ngOnDestroy(): void {
    this.offerServiceSub.unsubscribe();
  }
}
