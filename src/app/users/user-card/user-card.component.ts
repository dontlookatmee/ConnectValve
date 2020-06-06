import { Component, OnInit, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent implements OnInit {
  @HostBinding('style.margin')
  margin: string = '0 auto';

  @Input('name') name: string;
  @Input('avatar') avatar: string;
  @Input('desc') description: string;
  @Input('status') status: string;
  @Input('userId') userId: string;
  @Input('votes') votes: string[];
  constructor() {}

  ngOnInit(): void {}
}
