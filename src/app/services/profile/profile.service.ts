import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

export interface User {
  avatar: string;
  description: string;
  email: string;
  name: string;
  last_changed: Date;
  password: string;
  services: string[];
  votes?: string[];
  status: string;
  uid: string;
}

export interface UsersMeta {
  id: string;
  data: {
    avatar: string;
    description: string;
    email: string;
    name: string;
    last_changed: Date;
    password: string;
    services: string[];
    votes?: string[];
    status: string;
    uid: string;
  };
}

interface Message {
  fromUser: string;
  fromUserAvatar: string;
  fromUserId: string;
  date: number;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(
    private afs: AngularFirestore,
    private authService: AuthService
  ) {}

  addUserInDB(user: {}, uid: any) {
    return this.afs.collection('profiles').doc(uid).set(user);
  }

  getUserProfile(uid: string) {
    return this.afs
      .collection<User>('profiles')
      .doc(uid)
      .valueChanges()
      .pipe(
        switchMap((user: User) => {
          if (user) {
            return of(user);
          } else {
            return of(null);
          }
        })
      );
  }

  getUsersProfiles() {
    return this.afs.collectionGroup('profiles').valueChanges();
  }

  updateUserProfile(data: {}) {
    const userId = this.authService.getUserId();
    return this.afs.collection<User>('profiles').doc(userId).update(data);
  }

  sendMessage(toUser: string, data: Message) {
    return this.afs
      .collection<User>('profiles')
      .doc(toUser)
      .collection('messages')
      .add(data);
  }

  getUserMessages() {
    const userId = this.authService.getUserId();
    return this.afs
      .collection<User>('profiles')
      .doc(userId)
      .collection('messages')
      .snapshotChanges()
      .pipe(
        map((data) => {
          return data.map((message) => {
            const data = message.payload.doc.data();
            const id = message.payload.doc.id;
            return { data, id };
          });
        })
      );
  }

  deleteUserMsg(msgId: string) {
    const userId = this.authService.getUserId();
    return this.afs
      .collection<User>('profiles')
      .doc(userId)
      .collection('messages')
      .doc(msgId)
      .delete();
  }
}
