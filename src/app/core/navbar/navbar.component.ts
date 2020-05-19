import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean;

  constructor(private auth: AuthService, private fAuth: AngularFireAuth) {
    this.auth.getUser().subscribe((user) => {
      if (user === null) {
        this.isLoggedIn = false;
      } else {
        this.isLoggedIn = true;
      }
    });
  }

  ngOnInit(): void {}

  handleLogOut() {
    this.fAuth.signOut();
  }
}
