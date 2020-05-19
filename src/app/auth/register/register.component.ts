import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { passwordMatch } from '../../custom-validators/passwordValidation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AngularFireAuth,
    private router: Router
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
      const password = this.registerForm.get('passwords.password').value;

      this.auth.createUserWithEmailAndPassword(email, password).then((x) => {
        this.router.navigate(['']);
      });
    }
  }
}
