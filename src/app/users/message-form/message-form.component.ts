import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProfileService, User } from 'src/app/services/profile/profile.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.css'],
})
export class MessageFormComponent implements OnInit {
  subject: string;
  message: string;
  user: User;
  userId: string;
  feedback: { visible: boolean; type?: string; message?: string };

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    this.profileService.getUserProfile(userId).subscribe((user: User) => {
      this.user = user;
    });

    this.userId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  handleMessage(form: NgForm) {
    if (form.valid) {
      const data = {
        fromUser: this.user.name,
        fromUserAvatar: this.user.avatar,
        fromUserId: this.user.uid,
        date: Date.now(),
        subject: this.subject,
        message: this.message,
      };

      this.profileService
        .sendMessage(this.userId, data)
        .then((x) => {
          form.reset();
          this.feedback = {
            visible: true,
            type: 'success',
            message: 'Message sent',
          };

          setTimeout(() => {
            this.feedback.visible = false;
          }, 2500);
        })
        .catch((err) => {
          this.feedback = {
            visible: true,
            type: 'error',
            message: 'Message not sent, please try again',
          };

          setTimeout(() => {
            this.feedback.visible = false;
          }, 2500);
        });
    }
  }
}
