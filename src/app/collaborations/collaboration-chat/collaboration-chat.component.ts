import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CollaborationService,
  Collaboration,
} from 'src/app/services/collaboration/collaboration.service';
import { ProfileService, User } from 'src/app/services/profile/profile.service';
import { switchMap, take } from 'rxjs/operators';
import { of, Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormGroup, NgForm } from '@angular/forms';

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
  @ViewChild('msgForm') from: NgForm;
  @HostListener('window:unload', ['$event'])
  unloadHandler() {
    this.cb.removeUserFromCollaboration(
      this.collaboration.id,
      this.loggedUser?.uid
    );
  }

  collaboration: Collaboration;
  cbOnInitSub: Subscription;
  messages: Messages[];
  fromUser: User;
  toUser: User;
  loggedUser: User;
  userOnline: boolean;
  userMessage: string;
  canSendMessage: boolean = true;

  constructor(
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private cb: CollaborationService,
    public profileService: ProfileService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    console.log('cb chat cp ngoninit');
    const path = this.activatedRouter.snapshot.paramMap.get('id');
    const userId = this.authService.getUserId();

    const cb = this.cb.getCollaboration(path);

    this.cbOnInitSub = cb
      .pipe(
        switchMap((cb: Collaboration) => {
          this.collaboration = cb;
          return of(cb.id);
        })
      )
      .subscribe((cbId: string) => {
        if (this.collaboration.data.status === 'active') {
          this.canSendMessage = true;
        } else {
          this.canSendMessage = false;
        }

        this.cbOnInitSub = this.cb
          .getCollaborationMessages(cbId)
          .subscribe((messages: Messages[]) => {
            this.messages = messages;
            setTimeout(() => {
              this.scrollToBottom();
            }, 500);
          });
      });

    this.cbOnInitSub = cb
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
    this.cbOnInitSub.unsubscribe();
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
