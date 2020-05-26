import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

export interface User {
  avatar: string;
  description: string;
  email: string;
  name: string;
  last_changed: Date;
  password: string;
  services: string[];
  status: string;
  uid: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private afs: AngularFirestore) {}

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

  updateUserProfile(uid: string, status: string) {
    return this.afs.collection<User>('profiles').doc(uid).update({
      status,
    });
  }
}
