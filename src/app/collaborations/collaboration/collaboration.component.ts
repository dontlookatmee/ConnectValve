import { Component, OnInit, Input } from '@angular/core';

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

  constructor() {}

  ngOnInit(): void {}
}
