import { Component, OnInit } from '@angular/core';
import { OffersService } from 'src/app/services/offers/offers.service';

interface Offer {
  collaborationCreated: boolean;
  fromUser: string;
  note: 'asd';
  price: number;
  service: string;
  status: string;
  time: number;
  toUser: string;
}

@Component({
  selector: 'app-received',
  templateUrl: './received.component.html',
  styleUrls: ['./received.component.css'],
})
export class ReceivedComponent implements OnInit {
  offersToMe: Offer[];

  constructor(private offersService: OffersService) {}

  ngOnInit(): void {
    this.offersService.getOffers().subscribe((offer: Offer[]) => {
      this.offersToMe = offer;
    });
  }
}
