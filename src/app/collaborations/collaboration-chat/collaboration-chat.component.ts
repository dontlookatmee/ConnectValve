import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CollaborationService,
  Collaboration,
} from 'src/app/services/collaboration/collaboration.service';
import { ProfileService, User } from 'src/app/services/profile/profile.service';
import { switchMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-collaboration-chat',
  templateUrl: './collaboration-chat.component.html',
  styleUrls: ['./collaboration-chat.component.css'],
})
export class CollaborationChatComponent implements OnInit {
  collaboration: Collaboration;
  fromUser: User;
  toUser: User;
  loggedUser: User;
  userOnline: boolean;

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
  }

  ngOnDestroy() {
    const userId = this.authService.getUserId();
    this.cb.removeUserFromCollaboration(this.collaboration.id, userId);
  }
}
