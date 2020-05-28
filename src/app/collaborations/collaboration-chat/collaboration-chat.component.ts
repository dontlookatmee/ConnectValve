import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CollaborationService,
  Collaboration,
} from 'src/app/services/collaboration/collaboration.service';
import { ProfileService, User } from 'src/app/services/profile/profile.service';
import { switchMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormGroup } from '@angular/forms';

interface Messages {
  name: string;
  message: string;
  date: Date;
}

@Component({
  selector: 'app-collaboration-chat',
  templateUrl: './collaboration-chat.component.html',
  styleUrls: ['./collaboration-chat.component.css'],
})
export class CollaborationChatComponent implements OnInit {
  @ViewChild('msgContainer') scroller: ElementRef;

  collaboration: Collaboration;
  messages: Messages[];
  fromUser: User;
  toUser: User;
  loggedUser: User;
  userOnline: boolean;
  userMessage: string;

  constructor(
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private cb: CollaborationService,
    public profileService: ProfileService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const path = this.activatedRouter.snapshot.paramMap.get('id');
    const cb = this.cb.getCollaboration(path);

    cb.subscribe((cb: Collaboration) => {
      this.collaboration = cb;

      this.cb
        .getCollaborationMessages(cb.id)
        .subscribe((messages: Messages[]) => {
          this.messages = messages;
          setTimeout(() => {
            this.scrollToBottom();
          }, 500);
        });
    });

    cb.pipe(
      switchMap((collaboration: Collaboration) => {
        const fromUser = this.profileService.getUserProfile(
          collaboration.data.fromUser
        );
        const toUser = this.profileService.getUserProfile(
          collaboration.data.toUser
        );
        return of([fromUser, toUser]);
      })
    ).subscribe((user: Observable<User>[]) => {
      user[0].subscribe((fUser: User) => {
        this.fromUser = fUser;
      });

      user[1].subscribe((tUser: User) => {
        this.toUser = tUser;
      });
    });

    const userId = this.authService.getUserId();
    this.profileService.getUserProfile(userId).subscribe((user: User) => {
      this.loggedUser = user;
    });

    this.scrollToBottom();
  }

  ngOnDestroy() {
    const userId = this.authService.getUserId();
    this.cb.removeUserFromCollaboration(this.collaboration.id, userId);
  }

  handleSendMessage(msgForm: FormGroup) {
    const cbId = this.collaboration.id;
    const msg = {
      name: this.loggedUser.name,
      message: this.userMessage,
      date: Date.now(),
    };
    this.cb.addCollaborationMessage(cbId, msg).then((x) => {
      this.scrollToBottom();
      msgForm.reset();
    });
  }

  scrollToBottom(): void {
    try {
      this.scroller.nativeElement.scrollTop = this.scroller.nativeElement.scrollHeight;
    } catch (err) {
      console.log(err);
    }
  }
}
