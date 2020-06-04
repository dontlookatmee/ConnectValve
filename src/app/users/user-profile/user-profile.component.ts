import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService, User } from 'src/app/services/profile/profile.service';
import {
  UserServicesService,
  ServicesMeta,
} from 'src/app/services/user-services/user-services.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user: User;
  services: ServicesMeta[];
  canEditProfile: boolean;
  canSendMessages: boolean;
  editMode: boolean = false;
  messageMode: boolean = false;
  feedback: { visible: boolean; type?: string; message?: string };

  editProfileForm = this.fb.group({
    avatar: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
        ),
      ],
    ],
    description: ['', [Validators.maxLength(120), Validators.minLength(5)]],
    email: ['', [Validators.required, Validators.pattern(/\S+@\S+\.\S+/)]],
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private profileService: ProfileService,
    private userServices: UserServicesService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const path = this.activatedRoute.snapshot.paramMap.get('id');
    this.profileService.getUserProfile(path).subscribe((user: User) => {
      this.user = user;

      if (user.uid === this.authService.getUserId()) {
        this.canEditProfile = true;
        this.canSendMessages = false;
        this.editProfileForm.patchValue({
          avatar: user.avatar,
          description: user.description,
          email: user.email,
        });
      } else {
        this.canEditProfile = false;
        this.canSendMessages = true;
      }
    });

    this.userServices
      .getUserServices(path)
      .subscribe((services: ServicesMeta[]) => {
        this.services = services;
      });
  }

  handleEditMode() {
    this.editMode = !this.editMode;
  }

  handleProfileUpdate() {
    console.log('updated');
    if (this.editProfileForm.valid) {
      const data = {
        avatar: this.editProfileForm.get('avatar').value,
        description: this.editProfileForm.get('description').value,
        email: this.editProfileForm.get('email').value,
      };
      console.log(data);
      this.profileService
        .updateUserProfile(data)
        .then((x) => {
          this.editMode = false;
          this.feedback = {
            visible: true,
            type: 'success',
            message: 'Profile updated successful',
          };
          setTimeout(() => {
            this.feedback = {
              visible: false,
            };
          }, 2500);
        })
        .catch((err) => {
          this.feedback = {
            visible: true,
            type: 'error',
            message: 'Please try again',
          };
          setTimeout(() => {
            this.feedback = {
              visible: false,
            };
          }, 2500);
        });
    }
  }

  handleMessageMode() {
    this.messageMode = !this.messageMode;
  }
}
