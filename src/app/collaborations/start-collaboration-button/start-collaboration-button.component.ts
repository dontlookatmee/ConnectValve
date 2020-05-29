import { Component, OnInit, Input } from '@angular/core';
import {
  CollaborationService,
  Collaboration,
} from 'src/app/services/collaboration/collaboration.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-start-collaboration-button',
  templateUrl: './start-collaboration-button.component.html',
  styleUrls: ['./start-collaboration-button.component.css'],
})
export class StartCollaborationButtonComponent implements OnInit {
  @Input('cbId') cbId: string;
  canStartCb: boolean = false;
  constructor(
    private cb: CollaborationService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const path = this.activatedRoute.snapshot.paramMap.get('id');

    this.cb.getCollaboration(path).subscribe((cb: Collaboration) => {
      console.log('called button subscribe');
      if (cb.data.joinedPeople.length === 2) {
        this.canStartCb = true;
      } else {
        this.canStartCb = false;
      }
    });
  }

  handleStartCb() {
    this.cb.updateCollaboration(this.cbId, { status: 'active' });
  }
}
