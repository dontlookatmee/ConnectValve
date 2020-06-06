import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { passwordMatch } from '../../custom-validators/passwordValidation';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isRegistrationCompleted: { message: string; showMessage: boolean } = {
    message: '',
    showMessage: false,
  };

  constructor(
    private fb: FormBuilder,
    private auth: AngularFireAuth,
    private router: Router,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/\S+@\S+\.\S+/)]],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ],
      ],
      avatar: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
          ),
        ],
      ],
      passwords: this.fb.group(
        {
          password: ['', [Validators.required, Validators.minLength(6)]],
          repeatPassword: ['', [Validators.required, Validators.minLength(6)]],
        },
        { validators: [passwordMatch] }
      ),
    });
  }

  handleRegister() {
    if (this.registerForm.valid) {
      const email = this.registerForm.get('email').value;
      const name = this.registerForm.get('name').value;
      const password = this.registerForm.get('passwords.password').value;
      const avatar = this.registerForm.get('avatar').value;

      this.auth
        .createUserWithEmailAndPassword(email, password)
        .then((data) => {
          const uid = data.user.uid;

          const user = {
            email,
            name,
            password,
            avatar,
            description: '',
            last_changed: new Date(),
            services: [],
            votes: [],
            status: 'offline',
            uid,
          };
          this.profileService
            .addUserInDB(user, uid)
            .then((x) => {
              this.router.navigate(['']);
            })
            .catch((err) => {
              this.isRegistrationCompleted.message = err;
              this.isRegistrationCompleted.showMessage = true;
              setTimeout(() => {
                this.isRegistrationCompleted.showMessage = false;
              }, 2500);
            });
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
