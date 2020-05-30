import { Injectable } from '@angular/core';
import { Collaboration } from '../../services/collaboration/collaboration.service';
import { Subscription, interval } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  timePassed: number;
  public timer: string;
  timerSub: Subscription;

  constructor() {}

  startTimer(cb: Collaboration) {
    // const updateCb = (cb: Collaboration, path) => {
    //   this.cb.updateCollaboration(this.path, {
    //     expiresAt: this.timePassed || this.cb.data.expiresAt,
    //   });
    // }
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
        return 'Collaboration has been finished';
      } else {
        this.timePassed = timePassed;
        console.log(this.timer);
        return `${hours}:${minutes}:${seconds}`;
      }
    };
  }
}
