import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  CollaborationService,
  Collaboration,
} from 'src/app/services/collaboration/collaboration.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
})
export class TimerComponent implements OnInit {
  collaboration: Collaboration;
  timePassed: number;
  timer: string;
  timerSub: Subscription;
  cbFinished: boolean;
  canStartCb: boolean = false;
  path: string;

  constructor(
    private cb: CollaborationService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.path = this.activatedRoute.snapshot.paramMap.get('id');

    this.cb.getCollaboration(this.path).subscribe((cb: Collaboration) => {
      this.collaboration = cb;

      if (cb.data.joinedPeople.length === 2) {
        this.canStartCb = true;
      } else {
        this.canStartCb = false;
      }
    });
  }

  updateCbTimeLeft(path: string) {
    this.cb.updateCollaboration(this.path, {
      expiresAt: this.timePassed || this.collaboration.data.expiresAt,
    });
  }

  coutDownHours(cb: Collaboration) {
    const now = Date.now();
    const expires = cb.data.expiresAt;

    const difference = expires - now;
    const timePassed = now + difference;

    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    if (difference < 0) {
      this.timerSub.unsubscribe();
      this.cbFinished = true;
      return '00:00:00';
    } else {
      this.timePassed = timePassed;
      console.log(this.timer);
      return `${hours}:${minutes}:${seconds}`;
    }
  }

  ngOnDestroy() {
    this.updateCbTimeLeft(this.path);
  }
}
