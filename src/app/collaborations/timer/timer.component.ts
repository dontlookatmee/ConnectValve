import { Component, OnInit, Input } from '@angular/core';
import { TimerService } from 'src/app/services/timer/timer.service';
import { Collaboration } from '../../services/collaboration/collaboration.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
})
export class TimerComponent implements OnInit {
  @Input('collaboration') collaboration: Collaboration;

  constructor(public timerService: TimerService) {}

  ngOnInit(): void {
    if (!this.timerService.hasTimerChanged()) {
      this.timerService.startTimer(this.collaboration);
    }
  }
}
