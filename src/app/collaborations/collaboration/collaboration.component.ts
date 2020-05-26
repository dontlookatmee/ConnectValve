import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CollaborationService } from 'src/app/services/collaboration/collaboration.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-collaboration',
  templateUrl: './collaboration.component.html',
  styleUrls: ['./collaboration.component.css'],
})
export class CollaborationComponent implements OnInit {
  @Input('title') title: string;
  @Input('date') date: Date;
  @Input('status') status: string;
  @Input('img') img: string;
  @Input('id') id: string;

  constructor(
    private router: Router,
    private cbService: CollaborationService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {}

  handleEnterCb() {
    const userId = this.auth.getUserId();

    this.cbService.addUserToCollaboration(this.id, userId).then((x) => {
      this.router.navigate(['collaborations', this.id]);
    });
  }
}
