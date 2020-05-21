import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class OffersService {
  constructor(private afs: AngularFirestore) {}

  addOfferToDB(offer: {}) {
    this.afs.collection('offers').add(offer);
  }
}
