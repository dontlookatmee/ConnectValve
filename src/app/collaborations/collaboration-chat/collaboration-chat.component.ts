import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CollaborationService,
  Collaboration,
} from 'src/app/services/collaboration/collaboration.service';
import { ProfileService, User } from 'src/app/services/profile/profile.service';
import { switchMap, take } from 'rxjs/operators';
import { of, Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

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
  cbOnInit: Subscription;
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
    const userId = this.authService.getUserId();

    const cb = this.cb.getCollaboration(path);

    this.cbOnInit = cb
      .pipe(
        switchMap((cb: Collaboration) => {
          this.collaboration = cb;
          return of(cb.id);
        })
      )
      .subscribe((cbId: string) => {
        this.cbOnInit = this.cb
          .getCollaborationMessages(cbId)
          .subscribe((messages: Messages[]) => {
            this.messages = messages;
            setTimeout(() => {
              this.scrollToBottom();
            }, 500);
          });
      });

    this.cbOnInit = cb
      .pipe(
        take(1),
        switchMap((collaboration: Collaboration) => {
          const fromUser = this.profileService.getUserProfile(
            collaboration.data.fromUser
          );
          const toUser = this.profileService.getUserProfile(
            collaboration.data.toUser
          );
          return of([fromUser, toUser]);
        })
      )
      .subscribe((user: Observable<User>[]) => {
        console.log('user subsc');
        user[0].subscribe((fUser: User) => {
          this.fromUser = fUser;
        });

        user[1].subscribe((tUser: User) => {
          this.toUser = tUser;
        });
      });

    this.profileService.getUserProfile(userId).subscribe((user: User) => {
      this.loggedUser = user;
    });
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  ngOnDestroy() {
    console.log('unsubscribed');
    this.cbOnInit.unsubscribe();
    this.cb.removeUserFromCollaboration(
      this.collaboration.id,
      this.loggedUser?.uid
    );
  }

  handleSendMessage(msgForm: any) {
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
