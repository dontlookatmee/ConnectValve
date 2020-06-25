import { Component, HostListener, Host } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ProfileService } from './services/profile/profile.service';
import { from } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    private afAuth: AngularFireAuth,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {}
}
