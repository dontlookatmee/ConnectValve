import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isRegistrationCompleted: { message: string; showMessage: boolean } = {
    message: '',
    showMessage: false,
  };
  constructor(
    private fb: FormBuilder,
    private fAuth: AngularFireAuth,
    private profileService: ProfileService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/\S+@\S+\.\S+/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  handleLogin() {
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;

    if (this.loginForm.valid) {
      this.fAuth
        .signInWithEmailAndPassword(email, password)
        .then((x) => {
          this.authService.user$.pipe(take(1)).subscribe((x) => {
            this.profileService.updateUserProfile('online');
          });
          this.router.navigate(['']);
        })
        .catch((err) => {
          this.isRegistrationCompleted.message = err;
          this.isRegistrationCompleted.showMessage = true;
          setTimeout(() => {
            this.isRegistrationCompleted.showMessage = false;
          }, 2500);
        });
    }
  }

  handleClosePopup() {
    this.isRegistrationCompleted.showMessage = false;
  }
}
