import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { tap, map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

interface Offer {
  collaborationCreated: boolean;
  fromUser: string;
  note: string;
  price: number;
  service: string;
  status: string;
  time: number;
  toUser: string;
}
@Injectable({
  providedIn: 'root',
})
export class OffersService {
  constructor(private afs: AngularFirestore, private auth: AuthService) {}

  addOfferToDB(offer: {}) {
    return this.afs.collection('offers').add(offer);
  }

  getOffers() {
    const userId = this.auth.getUserId();

    return this.afs
      .collection('offers')
      .valueChanges()
      .pipe(
        // map((values) => {
        //   const data = values.payload.data();
        //   const id = values.payload.id;
        //   return { id, data };
        // }),

        map((offers) =>
          offers.filter((offer: Offer) => {
            if (offer.toUser === userId) {
              return offer;
            }
          })
        )
      );
  }

  updateOffer(data: {}) {
    this.afs.collection('offers').doc();
  }
}
