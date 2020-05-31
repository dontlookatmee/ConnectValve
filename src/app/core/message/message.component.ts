import { Component, OnInit, Input } from '@angular/core';
import {
  Collaboration,
  CollaborationService,
} from 'src/app/services/collaboration/collaboration.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent implements OnInit {
  @Input('fromUser') fromUser: string;
  @Input('toUser') toUser: string;
  @Input('cbId') cbId: string;

  constructor(
    private cbService: CollaborationService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  handleJoinCb() {
    const userId = this.authService.getUserId();
    this.cbService.addUserToCollaboration(this.cbId, userId).then((x) => {
      this.router.navigate(['collaborations', this.cbId]);
    });
  }
}
