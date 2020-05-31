import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    public auth: AuthService,
    private fAuth: AngularFireAuth,
    private profileService: ProfileService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  handleLogOut() {
    const uid = this.authService.getUserId();

    this.profileService
      .updateUserProfile('offline')
      .then((x) => {
        this.fAuth.signOut();
      })
      .catch((err) => {
        alert('Something went wrong, please try again!');
      });
  }
}
