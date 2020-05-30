import { Injectable } from '@angular/core';
import {
  Collaboration,
  CollaborationService,
} from '../../services/collaboration/collaboration.service';
import { Subscription, interval } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  timePassed: number;
  public timer: string;
  timerSub: Subscription;

  constructor(private cbService: CollaborationService) {}

  startTimer(cb: Collaboration) {
    if (cb.data.status === 'active') {
      this.timerSub = interval(1000).subscribe((x) => {
        this.timer = countDown(cb);
      });
    }

    const countDown = (cb: Collaboration) => {
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
        this.cbService.updateCollaboration(cb.id, { status: 'finished' });
        return '';
      } else {
        this.timePassed = timePassed;
        console.log(this.timer);
        return `${hours}:${minutes}:${seconds}`;
      }
    };
  }
}
