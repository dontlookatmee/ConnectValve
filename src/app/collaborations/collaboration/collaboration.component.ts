import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  ngOnInit(): void {}

  handleEnterCb() {
    this.router.navigate(['collaborations', this.id]);
  }
}
