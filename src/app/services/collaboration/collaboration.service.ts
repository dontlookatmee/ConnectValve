import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, filter } from 'rxjs/operators';
import { of } from 'rxjs';

export interface Collaboration {
  id: string;
  data: {
    allowedPeople: string[];
    createdAt: string;
    expiresAt: string;
    fromOffer: string;
    fromUser: string;
    image: string;
    joinedPeople: [];
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
}
