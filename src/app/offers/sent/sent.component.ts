import { Component, OnInit } from '@angular/core';
import { OffersService } from 'src/app/services/offers/offers.service';

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

  constructor(private offersService: OffersService) {}

  ngOnInit(): void {
    this.offersService.getReceivedOffers().subscribe((offers: Offer[]) => {
      this.offersSent = offers;
    });
  }
}
