import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event) {
    this.profileService.updateUserProfile({ status: 'offline' });
  }

  constructor(
    public auth: AuthService,
    private fAuth: AngularFireAuth,
    private profileService: ProfileService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  handleLogOut() {
    this.profileService
      .updateUserProfile({ status: 'offline' })
      .then((x) => {
        this.fAuth.signOut();
      })
      .then((x) => {
        this.router.navigate(['']);
      })
      .catch((err) => {
        alert('Something went wrong, please try again!');
      });
  }
}
