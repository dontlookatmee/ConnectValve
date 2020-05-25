import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class CollaborationService {
  constructor(private afs: AngularFirestore) {}

  createCollaboration(data: {}) {
    this.afs.collection('collaborations').add(data);
  }
}
