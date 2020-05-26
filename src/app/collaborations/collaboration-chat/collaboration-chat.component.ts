import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CollaborationService } from 'src/app/services/collaboration/collaboration.service';

@Component({
  selector: 'app-collaboration-chat',
  templateUrl: './collaboration-chat.component.html',
  styleUrls: ['./collaboration-chat.component.css'],
})
export class CollaborationChatComponent implements OnInit {
  constructor(
    private activatedRouter: ActivatedRoute,
    private cb: CollaborationService
  ) {}

  ngOnInit(): void {
    const path = this.activatedRouter.snapshot.paramMap.get('id');

    this.cb.getCollaboration(path).subscribe((x) => console.log(x));
  }
}
