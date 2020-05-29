import { Component, OnInit, Input } from '@angular/core';
import {
  CollaborationService,
  Collaboration,
} from 'src/app/services/collaboration/collaboration.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { interval, timer, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-start-collaboration-button',
  templateUrl: './start-collaboration-button.component.html',
  styleUrls: ['./start-collaboration-button.component.css'],
})
export class StartCollaborationButtonComponent implements OnInit {
  collaboration: Collaboration;
  timeLeft: string;
  timer: Subscription;
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
      console.log('start cb fired');
      this.collaboration = cb;
      if (cb.data.joinedPeople.length === 2) {
        this.canStartCb = true;
      } else {
        this.canStartCb = false;
      }
    });
  }

  handleStartCb() {
    this.cb.updateCollaboration(this.path, {
      status: 'active',
      createdAt: Date.now(),
      expiresAt:
        Date.now() + this.converHoursToMillsc(this.collaboration?.data.time),
    });

    this.timer = interval(1000).subscribe((x) => {
      console.log('interval called');
      this.timeLeft = this.setTimeLeft();
    });
  }

  converHoursToMillsc(hours: number): number {
    return hours * 60 * 60 * 1000;
  }

  setTimeLeft() {
    const created = Date.now();
    const expires = this.collaboration?.data.expiresAt;

    let distance = expires - created;

    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // If the count down is over, write some text
    if (distance < 0) {
      this.cbFinished = true;
      this.timer.unsubscribe();
      return '00:00:00';
    } else {
      return `${hours}:${minutes}:${seconds}`;
    }
  }
}
