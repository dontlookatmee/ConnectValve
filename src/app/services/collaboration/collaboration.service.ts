import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { map, tap } from 'rxjs/operators';

export interface Collaboration {
  id: string;
  data: {
    allowedPeople: string[];
    createdAt: string;
    expiresAt: string;
    fromOffer: string;
    fromUser: string;
    image: string;
    joinedPeople: string[];
    serviceId: string;
    status: string;
    time: number;
    title: string;
    toUser: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class CollaborationService {
  constructor(private afs: AngularFirestore) {}

  createCollaboration(data: {}) {
    this.afs.collection('collaborations').add(data);
  }

  getMyCollaborations(id: string) {
    return this.afs
      .collectionGroup('collaborations')
      .stateChanges()
      .pipe(
        map((data) => {
          return data.map((values) => {
            const data = values.payload.doc.data();
            const id = values.payload.doc.id;
            return { id, data };
          });
        }),
        map((collaborations: Collaboration[]) => {
          return collaborations.filter((cb) => {
            return cb.data.allowedPeople.includes(id);
          });
        })
      );
  }

  getCollaboration(id: string) {
    return this.afs
      .collection('collaborations')
      .doc(id)
      .snapshotChanges()
      .pipe(
        map((value) => {
          const data = value.payload.data();
          const id = value.payload.id;
          return { id, data };
        })
      );
  }

  addUserToCollaboration(id: string, user: string) {
    return this.afs
      .collection('collaborations')
      .doc(id)
      .update({
        joinedPeople: firebase.firestore.FieldValue.arrayUnion(user),
      });
  }

  removeUserFromCollaboration(id: string, user: string) {
    return this.afs
      .collection('collaborations')
      .doc(id)
      .update({
        joinedPeople: firebase.firestore.FieldValue.arrayRemove(user),
      });
  }
}
