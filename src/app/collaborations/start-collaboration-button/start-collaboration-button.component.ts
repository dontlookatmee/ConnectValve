import { Component, OnInit } from '@angular/core';
import {
  CollaborationService,
  Collaboration,
} from 'src/app/services/collaboration/collaboration.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TimerService } from 'src/app/services/timer/timer.service';

@Component({
  selector: 'app-start-collaboration-button',
  templateUrl: './start-collaboration-button.component.html',
  styleUrls: ['./start-collaboration-button.component.css'],
})
export class StartCollaborationButtonComponent implements OnInit {
  collaboration: Collaboration;
  canStartCb: boolean = false;
  path: string;

  constructor(
    private cb: CollaborationService,
    private activatedRoute: ActivatedRoute,
    private timerService: TimerService
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

  handleStartCb() {
    this.cb
      .updateCollaboration(this.path, {
        status: 'active',
        createdAt: Date.now(),
        expiresAt:
          Date.now() + this.converHoursToMillsc(this.collaboration?.data.time),
      })
      .then((x) => {
        this.timerService.startTimer(this.collaboration);
      });
  }

  converHoursToMillsc(hours: number): number {
    return hours * 60 * 60 * 1000;
  }
}
