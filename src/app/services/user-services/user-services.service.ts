import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserServicesService {
  constructor(private afs: AngularFirestore) {}

  getServices() {
    return this.afs
      .collectionGroup('services')
      .snapshotChanges()
      .pipe(
        map((data) => {
          return data.map((values) => {
            const data = values.payload.doc.data();
            const id = values.payload.doc.id;
            return { id, data };
          });
        })
      );
  }

  getService(uid: string) {
    return this.afs.collection('services').doc(uid).valueChanges();
  }
}
