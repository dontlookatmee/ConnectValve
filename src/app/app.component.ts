import { Component, HostListener, Host } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private afAuth: AngularFireAuth) {}

  ngOnInit(): void {}
}
