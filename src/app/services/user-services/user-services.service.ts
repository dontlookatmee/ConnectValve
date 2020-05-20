import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserServicesService {
  constructor(private afs: AngularFirestore) {}

  getServices() {
    return this.afs.collectionGroup('services').valueChanges();
  }

  getService(uid: string) {
    return this.afs.collection('services').doc(uid).valueChanges();
  }
}
