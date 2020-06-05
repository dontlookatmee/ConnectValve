import { Component, OnInit } from '@angular/core';
import { CollaborationService } from 'src/app/services/collaboration/collaboration.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Collaboration } from '../../services/collaboration/collaboration.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-collaborations-list',
  templateUrl: './collaborations-list.component.html',
  styleUrls: ['./collaborations-list.component.css'],
})
export class CollaborationsListComponent implements OnInit {
  myCollaborations: Collaboration[];

  collaborationServiceSub: Subscription;

  constructor(
    private cbService: CollaborationService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    const userId = this.auth.getUserId();
    this.collaborationServiceSub = this.cbService
      .getMyCollaborations(userId)
      .subscribe((collaborations: Collaboration[]) => {
        this.myCollaborations = collaborations;
      });
  }

  ngOnDestroy(): void {
    this.collaborationServiceSub.unsubscribe();
  }
}
