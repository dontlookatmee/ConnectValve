import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private afs: AngularFirestore) {}

  addUserInDB(user: {}, uid: any) {
    return this.afs.collection('profiles').doc(uid).set(user);
  }
}
