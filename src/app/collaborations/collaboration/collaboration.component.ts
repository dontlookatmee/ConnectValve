import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import {
  CollaborationService,
  Collaboration,
} from 'src/app/services/collaboration/collaboration.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { switchMap, mergeMap, take } from 'rxjs/operators';
import { of } from 'rxjs';

interface Messages {
  name: string;
  message: string;
  date: Date;
}

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
  lastRep: string;

  constructor(
    private router: Router,
    private cbService: CollaborationService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.cbService
      .getCollaborationMessages(this.id)
      .subscribe((cb: Messages[]) => {
        const timeNow = Number(Date.now());
        const lastRep = Number(cb[cb.length - 1].date);

        this.lastRep = this.calcTime(timeNow, lastRep);
      });
  }

  handleEnterCb() {
    this.cbService
      .getCollaboration(this.id)
      .pipe(
        take(1),
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

  calcTime(current: number, previous: number) {
    let msPerMinute = 60 * 1000;
    let msPerHour = msPerMinute * 60;
    let msPerDay = msPerHour * 24;
    let msPerMonth = msPerDay * 30;
    let msPerYear = msPerDay * 365;

    let elapsed = current - previous;

    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + ' seconds ago';
    } else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + ' minutes ago';
    } else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + ' hours ago';
    } else if (elapsed < msPerMonth) {
      return 'approximately ' + Math.round(elapsed / msPerDay) + ' days ago';
    } else if (elapsed < msPerYear) {
      return (
        'approximately ' + Math.round(elapsed / msPerMonth) + ' months ago'
      );
    } else {
      return 'approximately ' + Math.round(elapsed / msPerYear) + ' years ago';
    }
  }
}
