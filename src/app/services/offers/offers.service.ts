import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { tap, map, filter } from 'rxjs/operators';
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
interface OfferMetadata {
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
      .snapshotChanges()
      .pipe(
        map((data) => {
          return data.map((offers) => {
            const data = offers.payload.doc.data();
            const id = offers.payload.doc.id;
            return { id, data };
          });
        }),
        map((offers: OfferMetadata[]) =>
          offers.filter((offer) => offer.data.toUser === userId)
        )
      );
  }

  updateOffer(offerId: string, data: {}) {
    this.afs.collection('offers').doc(offerId).update(data);
  }

  deleteOffer(offerId: string) {
    this.afs.collection('offers').doc(offerId).delete();
  }
}
