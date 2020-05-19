import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  private user$: Observable<firebase.User> = null;
  private userDetails: firebase.User = null;

  constructor(private afAuth: AngularFireAuth) {
    this.user$ = this.afAuth.authState;

    this.user$.subscribe((user) => {
      if (user) {
        console.log(user.uid);
        this.userDetails = user;
      } else {
        this.userDetails = null;
      }
    });
  }

  ngOnInit() {}

  isAuthenticated() {
    if (this.userDetails === null) {
      return false;
    } else {
      return true;
    }
  }
}
