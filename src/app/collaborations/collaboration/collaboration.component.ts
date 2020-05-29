import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import {
  CollaborationService,
  Collaboration,
} from 'src/app/services/collaboration/collaboration.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { switchMap, mergeMap } from 'rxjs/operators';
import { Subscription, of } from 'rxjs';

@Component({
  selector: 'app-collaboration',
  templateUrl: './collaboration.component.html',
  styleUrls: ['./collaboration.component.css'],
})
export class CollaborationComponent implements OnInit {
  @Input('title') title: string;
  @Input('date') date: Date;
  @Input('status') status: string;
  @Input('img') img: string;
  @Input('id') id: string;
  updateCb: Subscription;

  constructor(
    private router: Router,
    private cbService: CollaborationService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {}

  handleEnterCb() {
    this.updateCb = this.cbService
      .getCollaboration(this.id)
      .pipe(
        switchMap((collaboration: Collaboration) => {
          const toUser = collaboration.data.toUser;
          return of(toUser);
        })
      )
      .subscribe((userId: string) => {
        if (userId === this.auth.getUserId()) {
          this.cbService.updateCollaboration(this.id, { status: 'active' });
        }
      });
    this.router.navigate(['collaborations', this.id]);

    // const userId = this.auth.getUserId();
    // this.cbService.addUserToCollaboration(this.id, userId).then((x) => {
    // });
  }

  ngOnDestroy() {
    this.updateCb?.unsubscribe();
  }
}
