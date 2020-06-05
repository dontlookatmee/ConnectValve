import { Component, OnInit } from '@angular/core';
import {
  Collaboration,
  CollaborationService,
} from 'src/app/services/collaboration/collaboration.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  myCollaborations: Collaboration[];
  collaboratonServiceSub: Subscription;

  constructor(
    public auth: AuthService,
    private authService: AuthService,
    private cbService: CollaborationService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    this.collaboratonServiceSub = this.cbService
      .getMyCollaborations(userId)
      .subscribe((collaborations: Collaboration[]) => {
        this.myCollaborations = collaborations.filter(
          (cb: Collaboration) => cb.data.status === 'pending'
        );
      });
  }

  ngOnDestroy(): void {
    this.collaboratonServiceSub.unsubscribe();
  }
}
