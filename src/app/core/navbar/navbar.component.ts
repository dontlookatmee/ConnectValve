import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

interface User {
  avatar?: string;
  description?: string;
  email?: string;
  last_changed?: {
    seconds?: number;
    nanoseconds?: number;
  };
  name?: string;
  password?: string;
  services?: string[];
  status?: string;
  uid?: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean;
  user: User;

  constructor(public auth: AuthService, private fAuth: AngularFireAuth) {}

  ngOnInit(): void {}

  handleLogOut() {
    this.fAuth.signOut();
  }
}
