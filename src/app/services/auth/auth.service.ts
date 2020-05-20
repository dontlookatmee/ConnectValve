import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { switchMap, first } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

interface User {
  avatar: string;
  description: string;
  email: string;
  name: string;
  password: string;
  services: [];
  status: string;
  uid: string;
  last_changed: Date;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  user$: Observable<User>;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`profiles/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  ngOnInit() {}
}
