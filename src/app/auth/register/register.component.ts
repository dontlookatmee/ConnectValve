import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { passwordMatch } from "../../custom-validators/passwordValidation";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  constructor(private fromBuilder: FormBuilder) {}
  registerForm = this.fromBuilder.group({
    email: ["", [Validators.required, Validators.pattern(/\S+@\S+\.\S+/)]],
    name: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(15)],
    ],
    avatar: [
      "",
      [
        Validators.required,
        Validators.pattern(
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
        ),
      ],
    ],
    passwords: this.fromBuilder.group(
      {
        password: ["", [Validators.required, Validators.minLength(6)]],
        repeatPassword: ["", [Validators.required, Validators.minLength(6)]],
      },
      { validators: [passwordMatch] }
    ),
  });

  ngOnInit(): void {}
}
